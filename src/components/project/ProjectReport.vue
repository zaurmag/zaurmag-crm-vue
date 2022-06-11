<template>
  <div class="col-xl-6">
    <project-report-graphic :items="projects" />
  </div>

  <div class="col-xl-6">
    <project-report-common :items="projects" />
  </div>
</template>

<script>
import ProjectReportCommon from '@/components/project/ProjectReportCommon'
import ProjectReportGraphic from '@/components/project/ProjectReportGraphic'

export default {
  name: 'ProjectReport',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  components: {
    ProjectReportGraphic,
    ProjectReportCommon
  }
}
</script>

<style scoped></style>
