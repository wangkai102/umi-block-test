/**
 * Created : vincent
 * Date : 2019-03-25  10:57
 * Email : wangxiao@wafersystems.com
 */
import React, { PureComponent } from 'react';
import { Form, Input, Select, Button } from 'antd';
import moment from 'moment-timezone';
import { formatMessage } from 'umi-plugin-react/locale';
import { MIN_MENU_TITLE_LENGTH, MAX_MENU_TITLE_LENGTH } from '../../utils/contant';

import styles from '../../index.less';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

const initTimeZone = () => {
  const timeZones = moment.tz.names();
  const offsetTmz = [];
  timeZones.forEach((element, i) => {
    offsetTmz.push({
      key: `GMT${moment.tz(timeZones[i]).format('Z')}`,
      title: `(GMT${moment.tz(timeZones[i]).format('Z')}) ${element}`,
    });
  });
  return offsetTmz;
};

const timeZone = initTimeZone();

@Form.create()
class SaveOrUpdate extends PureComponent {
  okHandle = e => {
    e.preventDefault();
    const { form, disableForm, parentId, spaceDetails } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { dispatch } = this.props;
      let type;
      let data;
      if (spaceDetails) {
        data = { ...spaceDetails, ...fieldsValue };
        type = 'space/update';
      } else {
        data = { ...fieldsValue, parentId };
        type = 'space/save';
      }
      dispatch({
        type,
        payload: {
          data,
          success: () => {
            form.resetFields();
            disableForm();
          },
        },
      });
    });
  };

  cancelHandle = () => {
    const { form, disableForm } = this.props;
    form.resetFields();
    disableForm();
  };

  onIconChange = v => {
    const { form } = this.props;
    form.setFieldsValue({ icon: v });
  };

  initialParentValue = (node, edit) => {
    if (node) {
      return node.parentId;
    }
    if (edit) {
      return -1;
    }
    return '';
  };

  render() {
    const { form, spaceDetails, edit, holidayList } = this.props;
    return (
      <Form onSubmit={this.okHandle}>
        <FormItem {...formItemLayout} label={formatMessage({ id: 'space.form.zh.name' })}>
          {form.getFieldDecorator('name', {
            initialValue: (spaceDetails && spaceDetails.name) || '',
            rules: [
              {
                message: formatMessage({ id: 'space.form.zh.name.placeholder' }),
                required: true,
                min: MIN_MENU_TITLE_LENGTH,
                max: MAX_MENU_TITLE_LENGTH,
              },
            ],
          })(
            <Input
              maxLength={MAX_MENU_TITLE_LENGTH + 1}
              disabled={!edit}
              placeholder={formatMessage({ id: 'space.form.zh.name.placeholder' })}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage({ id: 'space.form.en.name' })}>
          {form.getFieldDecorator('nameEn', {
            initialValue: (spaceDetails && spaceDetails.nameEn) || '',
            rules: [
              {
                message: formatMessage({ id: 'space.form.en.name.placeholder' }),
                min: MIN_MENU_TITLE_LENGTH,
                max: MAX_MENU_TITLE_LENGTH,
              },
            ],
          })(
            <Input
              maxLength={MAX_MENU_TITLE_LENGTH + 1}
              disabled={!edit}
              placeholder={formatMessage({ id: 'space.form.en.name.placeholder' })}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage({ id: 'space.form.time.zone' })}>
          {form.getFieldDecorator('timeZone', {
            initialValue: (spaceDetails && spaceDetails.timeZone) || '(GMT+08:00) Asia/Shanghai',
          })(
            <Select
              disabled={!edit}
              onChange={this.onIconChange}
              placeholder={formatMessage({ id: 'space.form.time.zone.placeholder' })}
              optionLabelProp="title"
            >
              {timeZone &&
                timeZone.map(v => (
                  <Option key={v.title} title={v.title} value={v.title}>
                    {v.title}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'space.form.longitude.and.latitude' })}
        >
          {form.getFieldDecorator('location', {
            initialValue: (spaceDetails && spaceDetails.location) || null,
          })(
            <Input
              disabled={!edit}
              placeholder={formatMessage({ id: 'space.form.longitude.and.latitude.placeholder' })}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage({ id: 'space.form.holidays.name' })}>
          {form.getFieldDecorator('holidayCode', {
            initialValue: (spaceDetails && spaceDetails.holidayCode) || undefined,
          })(
            <Select
              disabled={!edit}
              placeholder={formatMessage({ id: 'space.form.holidays.name.placeholder' })}
              style={{ width: '100%' }}
            >
              {holidayList &&
                holidayList.map(v => (
                  <Option key={v.id} value={v.id.toString()}>
                    {v.name}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={formatMessage({ id: 'space.form.desc' })}>
          {form.getFieldDecorator('remark', {
            initialValue: (spaceDetails && spaceDetails.remark) || null,
          })(<Input disabled={!edit} />)}
        </FormItem>
        {edit && (
          <FormItem {...submitFormLayout}>
            <Button htmlType="button" onClick={this.cancelHandle}>
              {formatMessage({ id: 'space.cancel.button' })}
            </Button>
            {!spaceDetails && (
              <Button htmlType="submit" className={styles.buttonMarginLeft} type="primary">
                {formatMessage({ id: 'space.save.button' })}
              </Button>
            )}
            {spaceDetails && (
              <Button htmlType="submit" className={styles.buttonMarginLeft} type="primary">
                {formatMessage({ id: 'space.update.button' })}
              </Button>
            )}
          </FormItem>
        )}
      </Form>
    );
  }
}

SaveOrUpdate.propTypes = {};

export default SaveOrUpdate;
