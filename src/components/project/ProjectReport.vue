<template>
  <div class="col-xl-6">
<!--<ProjectReportPeriod />-->
  </div>

  <div class="col-xl-6">
    <ProjectReportCommon :items="projects" />
  </div>
</template>

<script>
import ProjectReportCommon from '@/components/project/ProjectReportCommon'
// import ProjectReportPeriod from '@/components/project/ProjectReportPeriod'

export default {
  name: 'ProjectReport',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  components: {
    // ProjectReportPeriod,
    ProjectReportCommon
  }
}
</script>

<style scoped></style>
