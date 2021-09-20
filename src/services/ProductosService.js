import axios from 'axios';

const PRODUCT_API_BASE_URL = "https://mauiderlm7.execute-api.us-east-1.amazonaws.com/v1/api/";
//const PRODUCT_API_BASE_URL = "http://localhost:8080/api/";

class ProductosService {

    getProduct(){
        return axios.get(PRODUCT_API_BASE_URL+"productos");
    }

    createProduct(producto){
        return axios.post(PRODUCT_API_BASE_URL+"productos", producto);
    }

    getProductById(idProducto){
        return axios.get(PRODUCT_API_BASE_URL+"productos" + '/' + idProducto);
    }

    updateProduct(producto, idProducto){
        return axios.put(PRODUCT_API_BASE_URL+"productos" + '/' + idProducto, producto);
    }

    deleteProduct(idProducto){
        return axios.delete(PRODUCT_API_BASE_URL+"productos" + '/' + idProducto);
    }
    getUnidades(){
        return axios.get(PRODUCT_API_BASE_URL+"unidades");
    }
}

export default new ProductosService()