const state = () => ({
  menu: [],
  hotPlace: []
});

const mutations = {
  setMenu (state, menu) {
    state.menu = menu;
  },
  setHotPlace (state, hotPlace) {
    state.hotPlace = hotPlace;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
