<!-- pages/login.vue -->
<template>
  <div class="login">
    <h1>Login Page</h1>
    <UModal v-model="showModal" prevent-close>
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Login</h3>
        </template>

        <div class="p-4">
          <p class="mb-4">Secret phrase will be generated after logging in.</p>

          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton type="submit"> Login </UButton>
          </UForm>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { z } from 'zod';
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types/form';

const authStore = useAuthStore();
const router = useRouter();
const showModal = ref(true);

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: 'user@example.com',
  password: 'password',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const validatedData = schema.parse(state);
    if (await authStore.fetchUser()) {
      await router.push('/home');
    }
    await authStore.login(validatedData.email, validatedData.password);
    await router.push('/home');
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      // Handle validation errors (e.g., show error messages to the user)
    } else {
      console.error('Login error:', error);
      // Handle other errors (e.g., show a generic error message)
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
