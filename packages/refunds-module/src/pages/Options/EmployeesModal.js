import React, { Component } from "react";
import {
  Card,
  Table,
  Icon,
  Menu,
  Dropdown,
  Button,
  Label,
  Pagination,
  Row,
  Col,
  Form,
  Modal,
  Input,
  DatePicker,
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin
} from "antd";
import Highlighter from "react-highlight-words";
import SmartGridView from "../../components/SmartGridView";
import connect from "../../Redux";


const data = [{
  key: "1",
  name: "Алибаев Нурлан Каримолдаевич",
  position: "Главный эксперт",
  placeWork: "РГП"
}, {
  key: "2",
  name: "Карибаева Аида Жанатбековна",
  position: "Ведущий эксперт",
  placeWork: "РГП"
}, {
  key: "3",
  name: "Шаймерденова Аягоз Болатовна",
  position: "Эксперт",
  placeWork: "РГП"
}, {
  key: "4",
  name: "Айдаров Айбек Ганиевич",
  position: "Эксперт",
  placeWork: "РГП"
}
];

class EmployeesModal extends Component {

  state = {
    selectedIndex: null,
    searchText: "",
    fio: "",
    recordid: null,
    config:  {
      "start":0,
      "length":10,
      "entity":"users",
      "alias":null
    }
  };

  componentWillUnmount = () => {

  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "universal2/getList",
      payload: this.state.config
    })
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="custom-filter-dropdown">
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }}/>,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  onShowSizeChange = (current, pageSize) => {
    console.log(current)
    console.log(pageSize)
    this.setState({
      config:  {
        ...this.state.config,
        "start":current,
      }
    }, () => {
      const { dispatch } = this.props;
      dispatch({
        type: "universal2/getList",
        payload: this.state.config
      })
    })
  }

  render = () => {
    const data = this.props.universal2.references['users'] ? this.props.universal2.references['users'] : [];
    const columns = [{
      title: "ФИО",
      dataIndex: "userName",
      key: "userName",
      width: "30%",
      ...this.getColumnSearchProps("userName")
    }, {
      title: "Должность",
      dataIndex: "position",
      key: "position",
      width: "20%",
      ...this.getColumnSearchProps("position")
    }, {
      title: "Место работы",
      dataIndex: "company",
      key: "company",
      ...this.getColumnSearchProps("company")
    }
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      }
    };


    return (<div>
      <Modal
        style={{ top: 0 }}
        title={"Список сотрудников"}
        visible={true}
        width={1000}
        centered
        onCancel={() => {
          this.props.onCancel();
        }}
        onOk={() => {
          this.props.onChecked(this.state.recordid)
          this.props.onCancel();
          console.log({
            id:this.state.selectedIndex,
            fio: this.state.fio
          });
        }}>
          <Table columns={columns} dataSource={data.content}
               rowSelection={rowSelection}
                 rowKey={'id'}
                 rowClassName={(record, index) => {
                   return this.state.selectedIndex === index ? "active" : "";
                 }}
                 bordered={true}
                 onRow={(record, index) => ({

                   onClick: () => {

                     this.setState({
                       selectedIndex: index,
                       fio: record.name,
                       recordid: record.id
                     });
                   }
                 })}
                 pagination={false}

          />
        <Pagination defaultCurrent={1} total={100}
                    onChange={(page, pageSize) => {
                      this.onShowSizeChange(page - 1, pageSize);
                    }}
        />
      </Modal>
    </div>);

  };


}
export default connect(({ universal, universal2 }) => ({
  universal,
  universal2
}))(EmployeesModal);
