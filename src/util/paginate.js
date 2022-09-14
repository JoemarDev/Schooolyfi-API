
const paginateResult = async({p_page , p_limit , result , DataModel , query}) => {
    
    const page = Number(p_page) || 1;
    const limit = Number(p_limit)  || 10;
    const skip = (page - 1) * limit;

    result.skip(skip).limit(limit);

    const object = await result;

    const totalObject = await DataModel.countDocuments(query);

    const numOfPages = Math.ceil(totalObject / limit);

    return {object , totalObject  , numOfPages};

}

module.exports = paginateResult;