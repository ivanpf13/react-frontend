import React, { Component } from 'react'
import ProductosService from '../services/ProductosService'

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {},
            unidad:[]
        }
    }

    componentDidMount(){
        ProductosService.getProductById(this.state.id).then( res => {
            this.setState({product: res.data});
            this.setState({unidad: res.data.unidad});

        })
    }
    cancel(){
        this.props.history.push('/products');
    }

    render() {
        return (
        <div className="card w-75">
            <div className="card-body">
                <h5 className="card-title">Detalle del Producto</h5>
                <div className = "row">
                    <label> Nombre: </label>
                    <div> { this.state.product.nombre }</div>
                </div>
                <div className = "row">
                    <label> Clave: </label>
                    <div> { this.state.product.clave }</div>
                </div>
                <div className = "row">
                    <label> Precio: </label>
                    <div> { this.state.product.precio }</div>
                </div>
                <div className = "row">
                    <label> Unidad: </label>
                    <div> { this.state.unidad.unidad }</div>

                </div>
                <a href="#" onClick={this.cancel.bind(this)} className="btn btn-primary">Regresar</a>
            </div>
        </div>

    )
    }
}

export default ViewProductComponent
