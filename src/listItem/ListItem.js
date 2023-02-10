
import { Component } from 'react'
import { CgMathPlus } from 'react-icons/cg'


import DataList from './DataList/DataList'
import InputItem from './item/InpuItem'
import './listItem.css'



class ListItem extends Component{
    constructor(props) {
        super(props)
        this.state = {
            href: this.props.href,
            urlMarker: this.props.urlImgMarker,
            title: this.props.dataPopup.title,
            text: this.props.dataPopup.text,
            urlImg: this.props.dataPopup.urlImg,
            lat: this.props.bangalore.lat,
            lng: this.props.bangalore.lng,
            links: this.props.dataPopup.links,
        }
    }



    onChangeValue = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    element

    onChangeData = () =>{
        this.props.onChangeData({
            href: this.state.href,
            urlImgMarker: this.state.urlMarker,

            bangalore: {
                lat: +this.state.lat,
                lng: +this.state.lng
            },
            dataPopup: {
                title: this.state.title,
                text: this.state.text,
                urlImg: this.state.urlImg,
                links: [
                    ...this.state.links
                ]
            }
        })
    }

    getData = (value, id) =>{
        if(this.state.links){
            this.setState(({links}) =>({
                links: links.map((item) =>{
                    if(item.linkId === id){
                        item.url = value.url
                        item.name = value.name
                        return value
                    } else return item
                })
            }))
        }
    }

    deleteListItem = (id) =>{
        this.setState(({links}) => {
            return {
                links: links.filter(item => item.linkId !== id)
            }
        })
    }


    onAddLinks = (e) =>{
        e.preventDefault()
        let newArr = this.state.links
        let linkId = this.createId()
        newArr.push({url: '', name: '', linkId: `${linkId}`})
        this.setState({links: newArr})
    }

    createId = () =>{
        return Math.random() * (10000 - -10000) + -10000;
    }


    render() {
        const {disabled, onToggleProp, deleteItem} = this.props
        const {href, urlMarker, title, text, urlImg, lat, lng, links} = this.state
    

        let editDisplay, saveDisplay, styles
        if(disabled){
            saveDisplay = 'none'
            styles = {display: 'none'}
        } else{
            saveDisplay = 'block'
            editDisplay = 'none'
        };


        let elem
        if(links){
            elem = links.map((item, i) =>{
                let deleteItem = true
                let label =false
                if(i< 1){
                    label = true
                }
                if(i < 1 || disabled){
                    deleteItem = false
                } 
                return(
                    <DataList key={item.linkId} url={item.url} name={item.name} disabled={disabled} getData={this.getData} linkId={item.linkId} deleteItem={deleteItem} onDelete={this.deleteListItem} label={label}/>
                )
            })
        } else{
            let linkId = this.maxID++
            elem = <DataList key={linkId} url='' name='' disabled={disabled} getData={this.getData} deleteItem={deleteItem} onDelete={this.deleteListItem}/>
        }


        return(
          <li className="list__item">
        <ul className="list">
          <InputItem
            label="Href"
            id="href"
            disabled={disabled}
            name="href"
            onChangeValue={this.onChangeValue}
            valueProp={href}
          />
          <InputItem
            label="Url img marker"
            id="url-marker"
            disabled={disabled}
            name="urlMarker"
            onChangeValue={this.onChangeValue}
            valueProp={urlMarker}
          />
          <InputItem
            label="Title"
            id="title"
            disabled={disabled}
            name="title"
            onChangeValue={this.onChangeValue}
            valueProp={title}
          />
          <InputItem
            label="Text"
            id="text"
            disabled={disabled}
            name="text"
            onChangeValue={this.onChangeValue}
            valueProp={text}
          />
          <InputItem
            label="Url img"
            id="url-img"
            disabled={disabled}
            name="urlImg"
            onChangeValue={this.onChangeValue}
            valueProp={urlImg}
          />
          <InputItem
            label="Lat"
            id="lat"
            disabled={disabled}
            name="lat"
            onChangeValue={this.onChangeValue}
            valueProp={lat}
            type="number"
          />
          <InputItem
            label="Lng"
            id="lng"
            disabled={disabled}
            name="lng"
            onChangeValue={this.onChangeValue}
            valueProp={lng}
            type="number"
          />
          <ul className="data__list">{elem}</ul>
          <li className="item item__buttons">
            <button
              className="add__list-links"
              style={styles}
              onClick={this.onAddLinks}
            >
              <CgMathPlus />
            </button>
            <button
              className="edit list__item-btn"
              data-toggle="disabled"
              style={{ display: editDisplay }}
              onClick={onToggleProp}
            >
              Edit
            </button>
            <button
              className="save list__item-btn"
              data-toggle="disabled"
              style={{ display: saveDisplay }}
              onClick={this.onChangeData}
            >
              Save
            </button>
            <button className="delete list__item-btn" onClick={deleteItem}>
              Delete
            </button>
          </li>
        </ul>
      </li>
    );
  }
}

export default ListItem;