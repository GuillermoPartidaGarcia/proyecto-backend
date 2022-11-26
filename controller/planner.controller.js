const plannerService = require('../service/planner.service');

function validatePlannerCreate(userid){
    if(!userid)
        return 'userid cannot be null';
    return null;
}
async function plannerCreate(req, res){
    const { 
        body:{date, productids},
        user:{id:userid} 
    } = req;

    console.log(date);
    
    const userErr =  validatePlannerCreate(userid);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await  plannerService.plannerCreate(userid, date, productids);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

function validatePlannerRead(id){
    if(!id)
        return 'id cannot be null';
    return null;
}
async function plannerRead(req, res){
    const { id } = req.params;
    
    const userErr = validatePlannerRead(id);
    if(userErr)
        return res.status(400).send(userErr);
    
    const { code, err, data } = await  plannerService.plannerFind(id);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

function validatePlannerAddProduct(id, productid){
    if(!id)
        return 'id cannot be null';
    if(!productid)
        return 'productid cannot be null';
    return null;
}
async function plannerAddProduct(req, res){
    const { 
        params:{id},
        body:{productid}
    } = req;
    
    const userErr = validatePlannerAddProduct(id, productid);
    if(userErr)
        return res.status(400).send(userErr);
    
    const { code, err, data } = await  plannerService.plannerAddProduct(id, productid);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

async function plannerRemoveProduct(req, res){
    const { 
        params:{id},
        body:{productid}
    } = req;
    
    const userErr = validatePlannerAddProduct(id, productid);
    if(userErr)
        return res.status(400).send(userErr);
    
    const { code, err, data } = await  plannerService.plannerRemoveProduct(id, productid);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

function validatePlannerReschedule(id, date){
    if(!id)
        return 'id cannot be null';
    if(!date)
        return 'date cannot be null';
    return null;
}
async function plannerReschedule(req, res){
    const { 
        params:{id},
        body:{date}
    } = req;
    
    const userErr = validatePlannerReschedule(id, date);
    if(userErr)
        return res.status(400).send(userErr);
    
    const { code, err, data } = await  plannerService.plannerReschedule(id, date);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

async function plannerBuy(req, res){
    const { id } = req.params;
    
    const userErr = validatePlannerRead(id);
    if(userErr)
        return res.status(400).send(userErr);
    
    const { code, err, data } = await  plannerService.plannerBuy(id);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

async function plannerDelete(req, res){
    const { id } = req.params;
    
    const userErr = validatePlannerRead(id);
    if(userErr)
        return res.status(400).send(userErr);
    
    const { code, err, data } = await  plannerService.plannerDelete(id);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

module.exports = {
    plannerCreate,
    plannerRead,
    plannerAddProduct,
    plannerRemoveProduct,
    plannerReschedule,
    plannerBuy,
    plannerDelete,
};
