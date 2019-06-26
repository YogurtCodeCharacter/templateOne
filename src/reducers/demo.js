import { handleActions } from 'redux-actions';

// 方案列表
const listDemo = handleActions(
  {
    ['campaign/search'](state) {
      return { ...state, loading: true };
    },
    ['demo/getList/success'](state, action) {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        invalid: false,
        items: data.campaignDetailsList,
        pagination: {
          total: data.total,
          current: data.page === 0 ? 1 : data.page,
          pageSize: data.itemsPerPage,
        }
      };
    },
    ['demo/getList/failed'](state, action) {
      return {
        ...state,
        items: null,
        error: action.error,
        invalid: false,
        loading: false
      };
    }
  },
  {
    items: null,
    pagination: {
      current: 1,
      pageSize: 10
    },
    sorter: {
      sortField: null,
      sortOrder: null
    },
    searchParams: {
      id: null,
      name: null,
      creator: null,
      demander: null,
      bizName: null,
      statusList: null,
      timeRange: null,
    },
    invalid: true,
    loading: true,
    showAdvanceSearch: false
  });


// 方案创建/编辑
const editDemo = handleActions(
  {
    ['campaign/load'](state, action) {
      return {
        ...state,
        id: action.payload,
        invalid: false,
        loading: true
      };
    },
    ['campaign/load/success'](state, action) {
      return {
        ...state,
        data: action.payload,
        invalid: false,
        loading: false,
      };
    },
    ['campaign/load/failed'](state, action) {
      return {
        ...state,
        data: null,
        error: action.error,
        loading: false
      };
    },

    ['campaign/create'](state) {
      return { ...state, creating: true };
    },
    ['campaign/create/success'](state, action) {
      return {
        ...state,
        ...action.payload,
        data: null,
        invalid: true,
        loading: false,
        creating: false,
      };
    },
    ['campaign/create/failed'](state, action) {
      return {
        ...state,
        items: null,
        error: action.error,
        creating: false,
      };
    },
    ['campaign/update'](state) {
      return {
        ...state,
        saving: true
      };
    },
    ['campaign/update/success'](state) {
      return {
        ...state,
        id: null,
        data: null,
        invalid: true,
        saving: false,
      };
    },
    ['campaign/update/failed'](state, action) {
      return {
        ...state,
        data: null,
        error: action.error,
        saving: false,
      };
    },

  }, {
    data: null,
    id: null,
    invalid: true,     // 数据已经无效,需要重新加载
    loading: false,    // 正在重新加载
    saving: false,
    creating: false,
    offlining: false,  // 正在下线
    publishing: false, // 正在发布
  });


export default { listDemo, editDemo };
