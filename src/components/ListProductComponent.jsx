import React, { Component } from 'react'
import ProductosService from '../services/ProductosService'

class ListProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                articulos: []
        }
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(id){
        ProductosService.deleteProduct(id).then( res => {
            this.setState({articulos: this.state.articulos.filter(articulo => articulo.id !== id)});
        });
    }
    viewProduct(id){
        this.props.history.push(`/view-product/${id}`);
    }
    editProduct(id){
        this.props.history.push(`/add-product/${id}`);
    }

    componentDidMount(){
        ProductosService.getProduct().then((res) => {
            this.setState({ articulos: res.data});
        });
    }

    addProduct(){
        this.props.history.push('/add-product/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Productos</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addProduct}> Agregar Producto</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Nombre</th>
                                    <th> Clave</th>
                                    <th> Unidad</th>
                                    <th> Precio</th>
                                    <th> Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.articulos.map(
                                        articulo =>
                                        <tr key = {articulo.id}>
                                            <td> <a className="btn btn-link" onClick={ () => this.viewProduct(articulo.id)}> { articulo.nombre}</a> </td>
                                             <td> {articulo.clave}</td>
                                             <td> {articulo.unidad.unidad}</td>
                                             <td> {articulo.precio}</td>
                                            <td>
                                                 <button onClick={ () => this.editProduct(articulo.id)} className="btn btn-info">Actualizar </button>
                                                <button style={{marginLeft: "10px"}} onClick={() => window.confirm("¿Esta seguro de eliminar este producto?") && this.deleteProduct(articulo.id)}
                                                        className="btn btn-danger">Eliminar </button>


                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListProductComponent
