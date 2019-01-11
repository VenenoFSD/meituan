const state = () => ({
  position: {}
});

const mutations = {
  setPosition (state, position) {
    state.position = position;
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
