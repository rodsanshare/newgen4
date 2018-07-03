const customerService = require('./customerService');
const orderService = require('./orderService');

//do i need order model here since i'm using order service

(async () => {

    let orderToUpdate = {
        idorder: 3,
        orderdesc: 'Test 123',
        customer_idcustomer: 2
    }

    // var results1 = await customerService.get();
    // console.log(results1);

    // var results2 = await orderService.get();
    // console.log(results2);

    // var results3 = await orderService.update(orderToUpdate);
    // console.log(results3);
   
    // console.log('*********** before *********** ');
    // var results1 = await customerService.get();
    // console.log(results1);
    // console.log('*********** after *********** ');

    // console.log('*********** before *********** ');
    // var results1 = await orderService.get();
    // console.log(results1);
    // console.log('*********** after *********** ');

    console.log('*********** before *********** ');
    var results2 = await customerService.getOrders(1);
    console.log(results2);    
    console.log('*********** after *********** ');    

})();


//Test case: fieldname idorder was misspelled