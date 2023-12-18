import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const tableData = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]);
    const handleShowDrawer = async () => {
      tableData.value[0].name = Math.random() + '';
    };
    const showInfo = (row: any) => {
      console.log(row);
    };
    return () => (
      <div>
        <pl-button type="primary" onClick={handleShowDrawer}>
          显示Drawer
        </pl-button>
        <el-table data={tableData.value} style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address">
            {{
              default: ({ row }: any) => (
                <pl-button
                  type="primary"
                  onClick={() => {
                    showInfo(row);
                  }}
                >
                  显示Drawer
                </pl-button>
              ),
            }}
          </el-table-column>
        </el-table>
      </div>
    );
  },
});
