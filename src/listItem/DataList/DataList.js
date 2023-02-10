import { Component} from "react"
import {GrFormClose} from 'react-icons/gr'


import './dataList.css'


class DataList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            url: this.props.url,
            name: this.props.name
        }
    }

    onChangeValue = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    onBlure = () =>{
        this.props.getData({url: this.state.url, name: this.state.name, linkId: this.props.linkId}, this.props.linkId)
    }

    render() {
        const {url, name} = this.state
        const {disabled, deleteItem} = this.props
        let styles = {display: 'none'}
        let label
        if(deleteItem){
            styles = {display: 'block'};
        }
        if(this.props.label){
            label = ' label'
        } else {
            label = ' '
        }

        
        return (
            <li className="data__item">
                <ul className="data__sublist">
                    <li className={"data__subitem"+label}>
                        <label htmlFor="url">Url</label>
                        <input type="text" 
                            value={url}
                            id='url'
                            name='url'
                            disabled={disabled}
                            onChange={this.onChangeValue}
                            onBlur={this.onBlure}
                        />
                    </li>
                    <li className={"data__subitem"+label}>
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                            id='name'
                            value={name}
                            name='name'
                            onChange={this.onChangeValue}
                            onBlur={this.onBlure}
                            disabled={disabled}
                        />
                    </li>
                <li className="item__delete" style={styles}>
                        <button className="button__delete" onClick={(e) => {e.preventDefault(); this.props.onDelete(this.props.linkId)}}>
                            <GrFormClose/>
                        </button>
                    </li>
                </ul>
            </li>
        )
   }


}


export default DataList