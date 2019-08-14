import React from 'react';
import ReactDOM from 'react-dom';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import BookingModalContainer from '../../_containers/BookingModalContainer.jsx';

export default class OtherOffersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageStart: 0,
            pageSize: 3,
            isModalsShown: [],
        };
    }

    getCarInfoContainer = car => {
        return <Container fluid>
            <Row>
                <Col lg='6'>{car.rentalCompanyName}</Col>
                <Col lg='3'>{car.count}</Col>
                <Col lg='3'><strong>$</strong>{car.price}</Col>
            </Row>
        </Container>;
    }

    renderCarsHeader = () => {
        return <Container>
            <Row>
                <Col lg='6'><strong>Rental</strong></Col>
                <Col lg='3'><strong>Count</strong></Col>
                <Col lg='3'><strong>Price</strong></Col>
            </Row>
        </Container>;
    }

    onModalShow = id => {
        this.state.isModalsShown[id] = true;
        this.setState({ isModalsShown: this.state.isModalsShown });
    }
    onModalHide = id => {
        this.state.isModalsShown[id] = false;
        this.setState({ isModalsShown: this.state.isModalsShown });
    }

    renderCarsList = () => {
        let { pageSize, pageStart } = this.state;
        return this.props.info.map((car, id) => {
            this.state.isModalsShown.push(false);
            return <React.Fragment>
                <ListGroup.Item action key={id} onClick={e => this.onModalShow(id)}>
                    {this.getCarInfoContainer(car)}
                </ListGroup.Item>
                <BookingModalContainer
                    {...this.props.info[id]}
                    show={this.state.isModalsShown[id]}
                    onHide={() => this.onModalHide(id)} />
            </React.Fragment>;
        })
            .slice(pageStart, pageStart + pageSize);
    }

    slideList = difference => {
        let newPageStart = this.state.pageStart + (difference || 0);
        if (newPageStart < 0)
            newPageStart = 0;
        if (newPageStart > this.props.info.length - this.state.pageSize)
            newPageStart = this.props.info.length - this.state.pageSize;
        if(this.props.info.length < this.state.pageSize)
            newPageStart = 0;
        this.setState({ pageStart: newPageStart });
    }

    onWheel = (e) => {
        e = e || window.event;
        var delta = e.deltaY || e.detail || e.wheelDelta;
        this.slideList(Math.abs(delta) / delta)
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }

    componentDidMount() {
        let elem = ReactDOM.findDOMNode(this);
        if (elem.addEventListener) {
            if ('onwheel' in document) {
                elem.addEventListener("wheel", this.onWheel);
            }
        }
    }

    render() {
        let isTopArrowDisabled = this.state.pageStart <= 0;
        let isBottomArrowDisabled = this.state.pageStart + this.state.pageSize >= this.props.info.length;
        let topArrowSymbol = isTopArrowDisabled ? '△' : '▲';
        let bottomArrowSymbol = isBottomArrowDisabled ? '▽' : '▼';
        return <ListGroup variant='flush' className='otherOffers'>
            <ListGroup.Item style={{ textAlign: 'center' }} action onClick={e => this.slideList(-1)}>{topArrowSymbol}</ListGroup.Item>
            <ListGroup.Item variant='outline-dark'>{this.renderCarsHeader()}</ListGroup.Item>
            {this.renderCarsList()}
            <ListGroup.Item style={{ textAlign: 'center' }} action onClick={e => this.slideList(1)}>{bottomArrowSymbol}</ListGroup.Item>
        </ListGroup>;
    }
}