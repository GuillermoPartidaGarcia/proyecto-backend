const orderService = require('../service/order.service');

function validateOrderCreate(userid, productid, quantity){
    if(!userid)
        return 'Userid mandatory, must not be empty';
    if(!productid)
        return 'Productid mandatory, must not be empty';
    if( !quantity )
        return 'Quantity mandatory, must not be empty';
    if( quantity < 1 )
        return 'Quantity must be a positive number';

    return null;  
}
async function orderCreate(req, res){
    const { 
        body:{ productid, quantity }, 
        user:{id:userid} 
    } = req;

    const userErr = validateOrderCreate(userid, productid, quantity);
    if(userErr)
        return res.status(400).send(userErr);

    const {code, err, data} = await orderService.orderCreate(userid, productid, quantity);
    if(err)
        return res.status(code).send(err);
    
    return res.status(200).json(data);
}

function validateOrderFind(id){
    if(!id || id.length === 0)
        return 'OrderId mandatory, must not be empty';
    return null;  
}
async function orderRead(req, res){
    const { id } = req.params;

    const userErr = validateOrderFind(id);
    if(userErr)
        return res.status(400).send(userErr);

    const {code, err, data} = await orderService.orderFind(id);
    if(err)
        return res.status(code).send(err);
    
    return res.status(200).json(data);   
}

async function orderReadAll(req, res){
    const {code, err, data} = await orderService.orderAll();
    if(err)
        return res.status(code).send(err);
    
    return res.status(200).json(data);
        
}

function validateOrderFromUser(userid){
    if(!userid )
        return 'UserId mandatory, must not be empty';
    return null;  
}
async function orderFromUser(req, res){
    const { id:userid } = req.user;

    const userErr = validateOrderFromUser(userid);
    if(userErr)
        return res.status(400).send(userErr);

    const {code, err, data} = await orderService.orderFromUser(userid);
    if(err)
        return res.status(code).send(err);
    
    return res.status(200).json(data);   
}


module.exports = {
    orderCreate,
    orderRead,
    orderReadAll,
    orderFromUser,
};
