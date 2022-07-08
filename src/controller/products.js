const getProduct = (req, res) => {
    res.send({
        message: 'Success GetCreate Product',
        data: {
            id: 1,
            name: 'iPhone 6',
            price: 6000000
        }
    });
}

const postProduct = (req, res) => {
    const name = req.body.name;
    const price = req.body.price
    console.log(req.body)
    res.json({
        message: 'Success Create Product',
        data: {
            name: name,
            price: price
        }
    })
}


export default {
    getProduct,
    postProduct
}