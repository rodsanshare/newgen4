const customerService = require('./tester');

(async () => {
    console.log('before');
    var results1 = await customerService.get();
    console.log(results1);
    console.log('after');
})();
