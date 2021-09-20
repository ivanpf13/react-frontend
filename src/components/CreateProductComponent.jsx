import React, {Component, isValidElement} from 'react'
import ProductosService from '../services/ProductosService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nombre: '',
            clave: '',
            unidad: [],
            precio:'',
            selectedValue:'',
            fields: {},
            errors: {}
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeClaveHandler = this.changeClaveHandler.bind(this);
        this.saveOrUpdateProduts = this.saveOrUpdateProduts.bind(this);
    }

    // step 3
    componentDidMount(){
        ProductosService.getUnidades().then( (res) =>{
            this.setState({unidad:res.data
            });
        });
        // step 4
        if(this.state.id === '_add'){
            let fields = this.state.fields;
            fields["nombre"] = "dasd"
            fields["clave"] = "urur"
            fields["precio"] = "ififif"
            fields["unidad"] = "sadsa"
            this.setState({ fields });
            return;
        }else{
            ProductosService.getProductById(this.state.id).then( (res) =>{
                let product = res.data;
                this.setState({nombre: product.nombre,
                    clave: product.clave,
                    precio:product.precio,
                    selectedValue:product.unidad.id
                });
            });


        }        
    }
    saveOrUpdateProduts = (e) => {
        e.preventDefault();
        if(this.validateFields()==true){
        let producto = {nombre: this.state.nombre, clave: this.state.clave, unidad: {id:this.state.selectedValue}, precio: this.state.precio};
        console.log('preducto => ' + JSON.stringify(producto));
        // step 5
        if(this.state.id === '_add'){
            ProductosService.createProduct(producto).then(res =>{
                this.props.history.push('/products');
            });
        }else{
            ProductosService.updateProduct(producto, this.state.id).then( res => {
                this.props.history.push('/products');
            });
        }
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({nombre: event.target.value});
        let fields = this.state.fields;
        fields["nombre"] = event.target.value
        this.setState({ fields });
    }

    changeClaveHandler= (event) => {
        this.setState({clave: event.target.value});
        let fields = this.state.fields;
        fields["clave"] = event.target.value
        this.setState({ fields });
    }

    changePrecioHandler= (event) => {
        this.setState({precio: event.target.value});
        let fields = this.state.fields;
        fields["precio"] = event.target.value
        this.setState({ fields });
    }
    changeUnidadHandler= (event) => {
        this.setState({selectedValue: event.target.value});
        let fields = this.state.fields;
        fields["unidad"] = event.target.value
        this.setState({ fields });
    }
 validateFields(){
     let fields = this.state.fields;
     let errors = {};
     let formIsValid = true;
     //Name
     if (!fields["nombre"]) {
         formIsValid = false;
         errors["name"] = "El nombre del producto no debe estar vacio";
     }
     if (!fields["clave"]) {
         formIsValid = false;
         errors["clave"] = "La clave del producto no debe estar vacio";
     }
     if (!fields["precio"]) {
         formIsValid = false;
         errors["precio"] = "El precio del producto no debe estar vacio";
     }else if(parseFloat(fields["precio"])<=0){
         errors["precio"] = "El precio del producto debe ser mayor a cero";
     }
     if (!fields["unidad"]) {
         formIsValid = false;
         errors["unidad"] = "La unidad del producto no debe estar vacio";
     }else if(fields["unidad"]==="0"||fields["unidad"]==0){
         errors["unidad"] = "Elija la unidad del producto";
     }
     this.setState({ errors: errors });
     return formIsValid;
 }

    cancel(){
        this.props.history.push('/products');
    }
    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Agregar Producto</h3>
        }else{
            return <h3 className="text-center">Actualizar Producto</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }

                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nombre: </label>
                                            <input placeholder="Nombre" type="text" maxLength="30" name="nombre" className="form-control"
                                                value={this.state.nombre} onChange={this.changeNameHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                        </div>
                                        <div className = "form-group">
                                            <label> Clave: </label>
                                            <input placeholder="Clave" type="text" minLength="3" maxLength="30" name="clave" className="form-control"
                                                value={this.state.clave} onChange={this.changeClaveHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["clave"]}</span>

                                        </div>
                                        <div className = "form-group">
                                            <label> Precio: </label>
                                            <input type="number" step="0.1" placeholder="Precio" name="precio" className="form-control"
                                                value={this.state.precio} onChange={this.changePrecioHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["precio"]}</span>
                                        </div>
                                        <div className="form-group">
                                            <label>Unidad:</label>
                                            <select className="form-control" name="unidad" value={this.state.selectedValue}  onChange={this.changeUnidadHandler}
                                            ><option value="0">--Seleccione--</option>
                                                {this.state.unidad &&
                                                this.state.unidad.length > 0 &&
                                                this.state.unidad.map(uni => {
                                                    return <option key={uni.id} value={uni.id}>{uni.unidad}</option>;
                                                })}
                                            </select>
                                            <span style={{ color: "red" }}>{this.state.errors["unidad"]}</span>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduts}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}
export default CreateProductComponent
