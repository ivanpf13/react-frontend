import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className = "footer">
                    <span className="text-muted">Todos los derechos reservados Empresa S.A de C.V</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent
