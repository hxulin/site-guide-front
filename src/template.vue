<template>
  <div class="content">

  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 5
          },
          keyword: ''
        }
      }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    destroyed() {

    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        const officeAnnouncement = () => {
        };

        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        this.queryParams.applyTimeStart = this.pickerTime
          ? this.pickerTime[0]
          : '';
        this.queryParams.applyTimeEnd = this.pickerTime
          ? this.pickerTime[1]
          : '';
        officeAnnouncement(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {

  }
</style>
