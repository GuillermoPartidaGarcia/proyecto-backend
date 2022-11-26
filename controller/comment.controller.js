const commentService=require('../service/comment.service');

function validateCommentCreate(userId, productId, content){
    if(!userId)
        return 'userId cannot be null';
    if(!productId)
        return 'productId cannot be null';

    if(!content || content.lenght === 0)
        return 'content cannot be empty';
        
    return null;
}
async function commentCreate(req,res){
    const { 
        body:{
            content, 
            productId
        },
        user:{id:userId}
    } = req;

    const userErr=validateCommentCreate(userId, productId, content);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await commentService.commentCreate(userId, productId, content);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

function validateCommentRead(id){
    if(!id)
        return 'id cannot be null';
    return null;
}
async function commentRead(req,res){
    const {id}=req.params;

    const userErr=validateCommentRead(id);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await commentService.commentFind(id);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

function validateCommentFromProduct(productId){
    if(!productId)
        return 'productId cannot be null';
    return null;
}
async function commentFromProduct(req,res){
    const {id:productId}=req.params;

    const userErr=validateCommentFromProduct(productId);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await commentService.commentFromProduct(productId);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

function validateCommentFromUser(userId){
    if(!userId)
        return 'userId cannot be null';
    return null;
}
async function commentFromUser(req,res){
    const {id:userId}=req.params;

    const userErr=validateCommentFromUser(userId);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await commentService.commentFromUser(userId);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

function validateCommentUpdate(id, content){
    if(!id)
        return 'id cannot be null';
    if(!content || content.lenght===0)
        return 'content cannot be empty';
    return null;
}
async function commentUpdate(req,res){
    const {
        params:{id},
        body:{content}
    }=req;

    const userErr=validateCommentUpdate(id, content);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await commentService.commentUpdate(id, content);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

async function commentDelete(req,res){
    const {id}=req.params;

    const userErr=validateCommentRead(id);
    if(userErr)
        return res.status(400).send(userErr);

    const { code, err, data } = await commentService.commentDelete(id);
    if(err)
        return res.status(code).send(err);
    return res.status(200).json(data);
}

module.exports = {
    commentCreate,
    commentRead,
    commentFromProduct,
    commentFromUser,
    commentUpdate,
    commentDelete
};
