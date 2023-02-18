<template>
  <div class="col-xl-6">
    <project-report-graphic :items="projects" />
  </div>

  <div class="col-xl-6">
    <project-report-common :items="projects" />
  </div>
</template>

<script>
import ProjectReportCommon from '@/components/project/ProjectReportCommon.vue'
import ProjectReportGraphic from '@/components/project/ProjectReportGraphic.vue'

export default {
  name: 'ProjectReport',
  components: {
    ProjectReportGraphic,
    ProjectReportCommon
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>
