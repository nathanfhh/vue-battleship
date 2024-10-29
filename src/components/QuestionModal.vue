<template>
  <v-dialog v-model="dialogVisible" persistent overlay-opacity="0.8">
    <div class="container">
      <h2>{{ question.text }}</h2>
      <div v-if="question.type === 'multiple-choice'">
        <div v-for="(option, index) in question.options" :key="index">
          <input type="radio" :id="'option' + index" :value="option" v-model="selectedAnswer">
          <label :for="'option' + index">{{ option }}</label>
        </div>
      </div>
      <div v-else-if="question.type === 'true-false'">
        <input type="radio" id="true" value="true" v-model="selectedAnswer">
        <label for="true">True</label>
        <input type="radio" id="false" value="false" v-model="selectedAnswer">
        <label for="false">False</label>
      </div>
      <div v-else-if="question.type === 'codeSnippets'">
        <pre>{{ question.codeSnippet }}</pre>
        <input type="text" v-model="selectedAnswer" placeholder="Enter your answer">
      </div>
      <button @click="submitAnswer">Submit</button>
    </div>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  question: Object,
});

const emit = defineEmits(['answered']);

const dialogVisible = ref(true);
const selectedAnswer = ref(null);

watch(() => props.question, () => {
  dialogVisible.value = true;
  selectedAnswer.value = null;
});

const submitAnswer = () => {
  const isCorrect = selectedAnswer.value === props.question.correctAnswer;
  emit('answered', isCorrect);
  dialogVisible.value = false;
};
</script>

<style scoped>
.container {
  font-family: bfont;
  min-width: 100%;
  background-color: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 0 2px 2px rgb(56, 56, 56);
}

.container h2 {
  font-size: 3.2rem;
  text-shadow: 0 2px 2px black;
  text-align: center;
  text-decoration: underline;
}

.container div {
  margin: 1rem 0;
}

.container button {
  font-size: 2.4rem;
  text-shadow: 0 2px 2px black;
  text-align: center;
  outline: none;
  margin-top: 2rem;
}

.container button:hover,
.container button:focus {
  color: rgb(128, 255, 0);
}
</style>
