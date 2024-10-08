<script setup>
import { ref, watch } from "vue";
import { getDadata } from "../services/dadata-service";
import { debounce } from "vue-debounce";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const modelValue = defineModel("modelValue", {
  type: String,
});
const dadataResult = defineModel("dadataResult", {
  type: Object,
});
const props = defineProps({
  suggestion: {
    type: Object,
    default: () => undefined,
  },
  placeholder: {
    type: String,
    default: "",
  },
  debounceWait: {
    type: String,
    default: "1000ms",
  },
});
const emit = defineEmits("handleError");

const inputFocused = ref(false);
const suggestionsVisible = ref(true);
const suggestionIndex = ref(-1);
const suggestionList = ref([]);

watch(modelValue, async (newValue) => {
  fetchWithDebounce(newValue);
});

const fetchWithDebounce = debounce(async (query) => {
  try {
    const response = await fetchSuggestions(query);
    suggestionList.value = response.suggestions;
  } catch (error) {
    console.error(error);
    $toast.error(
      "There is some problem with geolocation service, try again later."
    );
  }
}, props.debounceWait);

const fetchSuggestions = async (query) => {
  const response = await getDadata(query);

  return response;
};

const onInputFocus = () => {
  inputFocused.value = true;
};

const onInputBlur = () => {
  inputFocused.value = false;
};

const selectSuggestion = (index) => {
  dadataResult.value = suggestionList.value[index];
  // emit("update:modelValue", suggestionList.value[index].value);
  emit("update:modelValue", "");
};

const resetSuggestions = () => {
  suggestionsVisible.value = false;
  suggestionIndex.value = -1;
  suggestionList.value = [];
};

const onSuggestionClick = (index) => {
  selectSuggestion(index);
  resetSuggestions();
};
const onInput = (e) => {
  emit("update:modelValue", e.target.value);
  suggestionsVisible.value = true;
};
</script>
<template>
  <div class="dadata-input-container">
    <div class="dadata-input-search">
      <input
        :value="modelValue"
        type="text"
        autocomplete="off"
        name="dadata-input"
        :placeholder="placeholder"
        @input="onInput"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
    </div>

    <!-- menu -->
    <transition name="fade" appear>
      <div
        v-if="inputFocused && suggestionsVisible"
        class="dadata-suggestion-menu"
      >
        <div
          v-for="(suggestionItem, index) in suggestionList"
          :key="`suggestion_${index}`"
          class="dadata-suggestion-item"
          @mousedown="onSuggestionClick(index)"
        >
          {{ suggestionItem.value }}
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.dadata-input-container {
  position: relative;
}

.dadata-input-search {
  input {
    color: var(--text-color-0);
    font-size: 1rem;
    width: 100%;
    border: 2px solid var(--border-color-0);
    outline: none;
    appearance: none;
    transition: background 0.2s;
    border-radius: 5px;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.1);
  }
  input::placeholder {
    color: var(--text-color-0);
  }
  input:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  input:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.2);
  }
}

.dadata-suggestion-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--main-color-0);
  color: var(--text-color-0);
  z-index: 10;
  border-radius: 5px;
  margin-top: 5px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.dadata-suggestion-item {
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background 0.1s;
}

.dadata-suggestion-item:hover {
  background-color: var(--main-color-1);
}
</style>
