<template>
  <v-dialog v-model="dialogVisible" persistent overlay-opacity="0.8">
    <div class="container">
      <h2>{{ props.question.question }}</h2>
      <div v-if="props.question.type === 'multiple-choice'">
        <div v-for="(option, index) in props.question.options" :key="index">
          <input type="radio" :id="'option' + index" :value="option" v-model="selectedAnswer">
          <label :for="'option' + index">{{ option }}</label>
        </div>
      </div>
      <div v-else-if="props.question.type === 'true-false'">
        <input type="radio" id="true" value="true" v-model="selectedAnswer">
        <label for="true">True</label>
        <input type="radio" id="false" value="false" v-model="selectedAnswer">
        <label for="false">False</label>
      </div>
      <div v-else-if="props.question.type === 'codeSnippets'">
        <pre style="font-size: 2.4rem">{{ props.question.codeSnippet }}</pre>
        <v-text-field
            style="font-size: 2.4rem;"
            v-model="selectedAnswer"
            label="Enter your answer"
        />
      </div>
      <v-btn density="default" @click="submitAnswer">Submit</v-btn>
    </div>
  </v-dialog>
  <v-snackbar
      timeout="15000"
      location="center"
      v-model="answerResult"
  >
    <span style="font-size: 2.4rem">{{ snackbarMessage }}</span>
  </v-snackbar>
</template>

<script setup>
import {ref, watch} from 'vue';

const props = defineProps({
  question: Object,
});

const emit = defineEmits(['answered']);
const answeredCorrectly = ref(null);
const answerResult = ref(false);
const dialogVisible = ref(true);
const selectedAnswer = ref(null);
const snackbarMessage = ref('');

watch(() => props.question, () => {
  dialogVisible.value = true;
  selectedAnswer.value = null;
});

const submitAnswer = () => {
  if (!selectedAnswer.value) {
    snackbarMessage.value = 'Answer cannot be blank!';
    answerResult.value = true;
    return;
  }
  if (props.question.type === 'true-false') {
    selectedAnswer.value = selectedAnswer.value === 'true';
  }
  const isCorrect = selectedAnswer.value === props.question.answer;
  console.log('selectedAnswer', selectedAnswer.value, props.question.answer);
  answerResult.value = true;
  answeredCorrectly.value = isCorrect;
  snackbarMessage.value = isCorrect ? 'Correct!' : 'Incorrect!';
  console.log('isCorrect', isCorrect);
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

label {
  font-size: 2.4rem;
  text-shadow: 0 2px 2px black;
  margin-left: 1rem;
}
</style>
