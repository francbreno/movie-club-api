describe('Execution order', () => {
  beforeEach(() => {
    console.log('This beforeEach is at top level. Must be execute before all tests');
  });
  describe('Given I want to test the execution order of a Jest test', () => {
    describe('Wehn I define a beforeEach', () => {
      beforeEach(() => {
        console.log('BEFORE EACH 1');
      });

      test('It must be executed always after the top level beforeEach', () => {

      });
    });

    describe('When I define another beforeEach', () => {
      beforeEach(() => {
        console.log('BEFORE EACH 2');

      });

      test('It must be executed always after the top level beforeEach', () => {

      });
    });
  });
});
