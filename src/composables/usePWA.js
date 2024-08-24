import { watch } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
import { useToast } from "vue-toast-notification";

export function usePWA() {
  const $toast = useToast();

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    immediate: true,
  });

  watch(needRefresh, (newValue) => {
    if (newValue) {
      $toast.info("New content available, click to reload.", {
        duration: 10000,
        onClick: () => {
          updateServiceWorker();
          window.location.reload();
        },
        onDismiss: () => {
          needRefresh.value = false;
        },
      });
    }
  });
}
