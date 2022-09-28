<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[100]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-dark bg-opacity-25 backdrop-blur-[1px]"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-black-medium p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 w-[97%] mx-auto text-white"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2 w-[97%] mx-auto">
                <slot />
              </div>

              <div class="mt-4 flex justify-end">
                <button
                  type="button"
                  class="inline-flex rounded-md border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  {{ buttonText }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
//@ts-nocheck
import { defineEmits, defineProps } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  buttonText: { type: String, required: true },
  title: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
});

const emit = defineEmits(["onClose"]);
function closeModal() {
  emit("onClose");
}
</script>
