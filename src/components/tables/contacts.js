import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Table, Tag } from 'antd';
import { getContactsFilteredData, getContactsList } from 'store/contacts/selectors';
import Avatar from 'antd/lib/avatar/avatar';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import { NATIONALITIES } from 'constants/nationalities';
import { ContactsFilters } from 'components/filters';
import { ContactStatistic } from 'components/statistic';

function TableContainer(props) {
    const {
        contactsList = []
    } = props

    return <Table
        title={() => <ContactsFilters />}
        footer={() => <ContactStatistic data={contactsList} />}
        rowKey={(record) => record.id}
        dataSource={contactsList}
        size="small"
        columns={[{
            title: "Avatar",
            dataIndex: "picture",
            width: 80,
            fixed: "left",
            align: "center",
            render(avatar) {
                return <Avatar size="large" src={avatar.medium} />
            }
        }, {
            title: "Full name",
            dataIndex: "fullName",
            width: 250,
            sorter: true,
            render(name, record) {
                return <Link to={routes["contacts-profile"].link(record["id"])}>{name}</Link>
            }
        }, {
            title: "Birthday",
            dataIndex: "dob",
            width: 250,
            render(dob) {
                return <div>
                    {new Date(dob.date).toLocaleDateString()}, {dob.age} years
                </div>
            }
        }, {
            title: "Email",
            dataIndex: "email",
            width: 250,
        }, {
            title: "Phone",
            dataIndex: "phone",
            width: 250,
        }, {
            title: "Location",
            dataIndex: "location",
            width: 250,
            render(location) {
                return <div>
                    <div style={{ fontWeight: "bold" }}>{location.country}</div>
                    {`${location?.street?.number || ""} ${location?.street?.name || ""}, ${location?.city || ""}, ${location?.state || ""} ${location?.postcode || ""}`}
                </div>
            }
        }, {
            title: "Nationality",
            dataIndex: "nat",
            width: 200,
            align: "right",
            render(nat) {
                const nation = NATIONALITIES[nat] || NATIONALITIES.DEFAULT
                return <Tag color={nation.color}>{nation.name}</Tag>
            }
        }]}
    />
}

const mapStateToProps = (state) => {
    return {
        contactsList: getContactsFilteredData(state) || getContactsList(state)
    }
};

const mapDispatchToProps = {};

const ContactsTable = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(TableContainer);

export { ContactsTable };