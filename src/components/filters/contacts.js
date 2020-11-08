import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Input, Select, Button, Checkbox } from 'antd';
import { obj2options } from 'utils/convert';
import { GENDER } from 'constants/gender';
import { NATIONALITIES } from 'constants/nationalities';
import { CloseOutlined } from '@ant-design/icons';
import { changeFiltersContacts } from 'store/contacts/actions';
import { getContactsFilteredData } from 'store/contacts/selectors';

const { Search } = Input;

const initialState = {
    'fullName': '',
    'gender': undefined,
    'nat': [],
    'email': false,
};

class Filters extends Component {
    state = { ...initialState };

    onChangeFieldType = (value, field) => {
        this.setState({
            [field]: value
        }, () => {
            this.props.changeFiltersContacts(this.state)
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
    };

    onClear = () => {
        this.setState(initialState, () => {
            this.props.changeFiltersContacts(this.state)
        });
    }

    render() {
        const { isFiltersActive } = this.props
        return (
            <form onSubmit={this.onSubmit} className="form-contacts">
                <Row type={'flex'} gutter={24} justify="center">
                    <Col span={20}>
                        <Row type={'flex'} gutter={12} align="middle" justify="center">
                            <Col span={11}>
                                <Search
                                    name={'fullName'}
                                    type={'text'}
                                    value={this.state['fullName']}
                                    placeholder={'Search by full name'}
                                    size={'large'}
                                    onChange={(e) => this.onChangeFieldType(e.target.value, "fullName")}
                                    allowClear
                                />
                            </Col>
                            <Col span={5}>
                                <Select
                                    style={{ width: "100%" }}
                                    name={'gender'}
                                    value={this.state['gender']}
                                    placeholder={'Gender'}
                                    size={'large'}
                                    allowClear
                                    onChange={(value) => this.onChangeFieldType(value, 'gender')}
                                >
                                    {obj2options(GENDER)}
                                </Select>
                            </Col>
                            <Col span={6}>
                                <Select
                                    name={'nat'}
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    onChange={(value) => this.onChangeFieldType(value, 'nat')}
                                    value={this.state['nat']}
                                    size={'large'}
                                    placeholder={'Nationality'}
                                    maxTagCount={2}
                                    allowClear
                                >
                                    {obj2options(Object.values(NATIONALITIES).map(nat => nat.name))}
                                </Select>
                            </Col>
                            <Col span={2}>
                                <Checkbox
                                    onChange={(e) => this.onChangeFieldType(e.target.checked, 'email')}
                                    checked={this.state['email']}
                                >I am creator
                                </Checkbox>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Row type="flex" justify="end">
                            <Col>
                                <Button
                                    htmlType={'submit'}
                                    className={'control control--submit'}
                                    size="middle"
                                    type={'link'}
                                    icon={<CloseOutlined />}
                                    disabled={!isFiltersActive}
                                    onClick={this.onClear}
                                >
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFiltersActive: !!getContactsFilteredData(state)
    }
};

const mapDispatchToActions = { changeFiltersContacts };

const ContactsFilters = compose(
    connect(mapStateToProps, mapDispatchToActions)
)(Filters);

export { ContactsFilters };
