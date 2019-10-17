import React from 'react';
import { Tree, Row, Col, Card, Menu } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import { makeTreeNodeI18NNameAndOperation } from './utils/utils';
import SaveOrUpdate from './components/SaveOrUpdate';

const spaceTree = [
  {
    id: 3,
    name: '威发',
    children: [
      {
        id: 10,
        name: '前端组',
        children: [],
        parentId: 3,
        parentName: '威发',
      }
    ],
    parentId: 0,
    parentName: '',
  },
];
const holidayList = [];
const spaceDetails = null;

class Index extends React.Component {
  menuClick = false;

  state = {
    selectedKeys: null,
    edit: false,
    parentId: null,
  };

  onEdit = node => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'space/getSpace',
    //   payload: {
    //     id: node.id,
    //   },
    // });
    this.setState({ edit: true, selectedKeys: [node.id.toString()] });
  };
x 
  disableForm = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'space/saveOrUpdateData',
      payload: {
        spaceDetails: null,
      },
    });
    this.setState({ edit: false, selectedKeys: null , formDetails: null});
  };

  delNode = node => {
    confirm({
      title: formatMessage({ id: 'space.tree.del.tip' }),
      okText: formatMessage({ id: 'space.del.button' }),
      okType: 'danger',
      width: 550,
      cancelText: formatMessage({ id: 'space.cancel.button' }),
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'space/deleteSpace',
          payload: {
            id: node.id,
          },
        });
      },
    });
  };

  addBrother = node => {
    const { dispatch } = this.props;
    this.menuClick = true;
    dispatch({
      type: 'space/saveOrUpdateData',
      payload: {
        spaceDetails: null,
      },
    });
    this.setState({
      parentId: node.parentId,
      edit: true,
      selectedKeys: [node.id.toString()],
    });
  };

  addChild = node => {
    const { dispatch } = this.props;
    this.menuClick = true;
    dispatch({
      type: 'space/saveOrUpdateData',
      payload: {
        spaceDetails: null,
      },
    });
    this.setState({
      parentId: node.id,
      edit: true,
      selectedKeys: [node.id.toString()],
    });
  };

  onTreeSelect = (selectedKeys, { selectedNodes }) => {
    if (selectedNodes.length > 0 && !this.menuClick) {
      const { props } = selectedNodes[0];
      const { data } = props;
      const obj = {
        id: data.id,
      };
      this.onEdit(obj);
    }
    this.menuClick = false;
  };

  menu = node => {
    // const { menu } = this.props;
    // const { authority } = menu;
    return (
      <Menu>
        {node.parentId !== 0 && (
          <Menu.Item key="brother" onClick={() => this.addBrother(node)}>
            {/* {formatMessage({ id: 'space.tree.add.brother' })} */}
            添加同级
          </Menu.Item>
        )}
        <Menu.Item key="child" onClick={() => this.addChild(node)}>
          {/* {formatMessage({ id: 'space.tree.add.child' })} */}
          添加子级
        </Menu.Item>
        <Menu.Item
          key="edit"
          onClick={() => {
            this.onEdit(node);
          }}
        >
          {/* {formatMessage({ id: 'space.tree.edit' })} */}
          编辑
        </Menu.Item>
        {node.parentId !== 0 && node.children.length === 0 && (
          <Menu.Item key="del" onClick={() => this.delNode(node)}>
            {/* {formatMessage({ id: 'space.tree.del' })} */}
            删除
          </Menu.Item>
        )}
      </Menu>
    );
  };

  render() {
    const { selectedKeys, edit, parentId } = this.state;

    return (
      <Row>
        <Col xs={12} sm={10} md={10} lg={5} xl={5}>
          <Card className={styles.card}>
            <Tree selectedKeys={selectedKeys} onSelect={this.onTreeSelect}>
              {makeTreeNodeI18NNameAndOperation(spaceTree, this.menu)}
            </Tree>
          </Card>
        </Col>
        <Col xs={12} sm={14} md={14} lg={19} xl={19}>
          <Card className={styles.cardLeft}>
            <div className={styles.tableList}>
              <SaveOrUpdate
                edit={edit}
                spaceDetails={spaceDetails}
                parentId={parentId}
                holidayList={holidayList}
                // dispatch={dispatch}
                selectedKeys={selectedKeys}
                disableForm={this.disableForm}
              />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Index;
