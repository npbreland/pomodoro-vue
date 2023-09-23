<script setup>
import { ref, computed } from 'vue'

const stages = [
    {
        'name': 'Work 1/4',
        'duration': 25 * 60
    },
    {
        'name': 'Short Break 1/3',
        'duration': 5 * 60
    },
    {
        'name': 'Work 2/4',
        'duration': 25 * 60
    },
    {
        'name': 'Short Break 2/3',
        'duration': 5 * 60
    },
    {
        'name': 'Work 3/4',
        'duration': 25 * 60
    },
    {
        'name': 'Short Break 3/3',
        'duration': 5 * 60
    },
    {
        'name': 'Work 4/4',
        'duration': 25 * 60
    },
    {
        'name': 'Long Break',
        'duration': 15 * 60
    },
];

const currentStage = ref(0)
const timeLeft = ref(stages[currentStage.value].duration)
const timer = ref(null)

const pause = () => {
  clearInterval(timer.value)
  timer.value = null
}

const play = () => {
  if (timer.value) {
    return
  }
  timer.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value === 0) {
        advanceStage()
    }
  }, 1000)
}

const advanceStage = () => {
    currentStage.value = (currentStage.value + 1) % stages.length
    timeLeft.value = stages[currentStage.value].duration
}

const restartStage = () => {
  pause()
  timeLeft.value = stages[currentStage.value].duration
}

const restartSession = () => {
  pause()
  currentStage.value = 0
  timeLeft.value = stages[currentStage.value].duration
}


const timeLeftStr = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

</script>

<template>
  <main>
      <h1>Pomodoro Timer</h1>
      <div id="time-left">{{ timeLeftStr }}</div>
      <div>{{ stages[currentStage].name }}</div>
      <button v-if="timer" @click="pause" class="play-pause-toggle">
          <font-awesome-icon icon="pause" />
      </button>
      <button v-else @click="play" class="play-pause-toggle">
          <font-awesome-icon icon="play" />
      </button>
      <div class="buttons-row-2">
          <button @click="advanceStage">Next<br>stage</button>
          <button @click="restartStage">Restart<br>stage</button>
          <button @click="restartSession">Restart session</button>
      </div>
  </main>
</template>

<style scoped>
body {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
}
header {
    font-size: 2em;
    text-align: center;
    margin-bottom: 1em;
}

button {
    cursor: pointer;
}

.buttons-row-2 > button {
    width: 100px;
    margin: 0 5px;
}

main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;

    text-align: center;
    width: 400px;
    margin: 0 auto;
}


#time-left {
    font-size: 4em;
}

.play-pause-toggle {
    width: 320px;
    margin: 10px auto 5px auto;
    padding: 10px;
    font-size: 2em;
    cursor: pointer;
}

</style>
