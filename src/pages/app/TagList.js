import React, {Component} from 'react';
import _ from 'lodash';
import "./style.css";
import {
    Page,
    Form, 
    FormLayout, 
    Layout, 
    TextField, 
    Button, 
    Icon, 
    FooterHelp, 
    Card, 
    ChoiceList, 
    Select, 
    Checkbox, 
    ResourceList, 
    TextStyle, 
    Stack ,
    Subheading,
    List,
    SettingToggle,
    ExceptionList,
    Avatar } from '@shopify/polaris';

class TagList extends Component {
  state = {
    showForm: false,
    tagDesc:"",
    tagName: "",
    selectedCondition: "",
    selectedCondiLeft: 'Product tag',
    selectedCondiMiddle: 'is equal to',
    triggerMe: true,
    ruleValue:"",
    enableSetting1: false
  };

  handleChange = (field) => {
    return (value) => {
      this.setState({[field]: value})
    }
  };

  formSubmit = event => {
    const {tagDesc, tagName, selectedCondition, triggerMe, selectedCondiLeft, selectedCondiMiddle, ruleValue} = this.state;
    const {addTag} = this.props;
    event.preventDefault();
    addTag({
      "tagName": tagName, 
      "tagDesc": tagDesc, 
      "selectedCondition": selectedCondition,
      "triggerMe": triggerMe,
      "selectedCondiLeft": selectedCondiLeft,
      "selectedCondiMiddle": selectedCondiMiddle,
      "ruleValue": ruleValue
    });
    this.setState({showForm:false, "tagName": "", 
    "tagDesc": "", "selectedCondition": "", "triggerMe":"", "selectedCondiLeft":"", "selectedCondiMiddle":"", "ruleValue":""});
  };

  renderForm = () => {
    const {showForm, tagName, tagDesc, selectedCondition, triggerMe, selectedCondiLeft, selectedCondiMiddle, ruleValue} = this.state;
    const conditionLeft = [
      {label: 'Product tag', value: 'Product tag'},
      {label: 'Customer tag', value: 'Customer tag'},
      {label: 'Order tag', value: 'Order tag'},
    ];
    const conditionMiddle = [
      {label: 'is equal to', value: 'is equal to'},
      {label: 'is less than', value: 'is less than'},
      {label: 'is greater than', value: 'is greater than'},
    ];
    
    if (showForm) {
      return (
        <Card sectioned>
          <Card.Section
              title={
                <Stack>
                  <Icon source="add" />
                  <Subheading>Add tag rule</Subheading>
                </Stack>
              }
            >
              <div className="add-tag-form">
                <Form onSubmit={this.formSubmit}>
                  <FormLayout>
                    <div className="row">
                      <div className="tag-name-text">
                        <TextField
                          placeholder="Rule name"
                          value={tagName}
                          onChange={this.handleChange('tagName')}
                        />
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="tag-desc-text">
                        <TextField
                          placeholder="Description"
                          value={tagDesc}
                          onChange={this.handleChange('tagDesc')}
                          multiline
                        />
                      </div>
                    </div>
                    <div className="row">
                      <Layout>
                        <Layout.Section>
                          <Card title="Add rules conditions" sectioned>
                            <div className="condition-choice">
                              <ChoiceList
                                title={'Must match'}
                                choices={[
                                  {label: 'All conditions', value: 'all'},
                                  {label: 'Any conditions', value: 'any'},
                                ]}
                                selected={selectedCondition}
                                onChange={this.handleChange('rule-condition')}
                              />
                            </div>
                            <div className="list-of-condi-wrapper">
                                <ul>
                                  <li>
                                  <Select
                                    options={conditionLeft}
                                    onChange={this.handleChange('conditionLeft')}
                                    value={this.state.selectedCondiLeft}
                                  />
                                  </li>
                                  <li>
                                  
                                    <Select
                                      options={conditionMiddle}
                                      onChange={this.handleChange('conditionMiddle')}
                                      value={this.state.selectedCondiMiddle}
                                    />
                                  </li>
                                  <li>
                                  <TextField
                                      placeholder="Enter value"
                                      value={ruleValue}
                                      onChange={this.handleChange('ruleValue')}
                                    />
                                  </li>
                                </ul>
                            </div>
                            <div>
                            <Checkbox
                              checked={triggerMe}
                              label="Notify me when triggered"
                              onChange={this.handleChange('triggerMe')}
                            />
                            </div>
                            
                          </Card>
                        </Layout.Section>
                      </Layout>
                    </div>
                    <Button primary submit>Save tag</Button>
                  </FormLayout>
                </Form>
              </div>
              <Card>
              <Card.Section
                title={
                  <Stack>
                    <Subheading>Select products for tag</Subheading>
                  </Stack>
                }
              >
                
                <p className="marginTop">List of products here</p>
                
              </Card.Section>
            </Card>
            </Card.Section>
          
        </Card>
        
        
      );
    }
  };
  renderTags = () => {
    const {data} = this.props;
    const {showForm} = this.state;
    const tags = _.map(data, (value, key) => {
      return {"tagName":value.tagName, "tagDesc": value.tagDesc, "tagId": key}
    });
    
    return (
      <Card subdued>
        <Card.Section
          title={
            <Stack>
              <Icon source="products" />
              <Subheading>Tag rules</Subheading>
            </Stack>
          }
        >
          <div className="fixed-action-btn">
            <Button primary onClick={() => this.setState({showForm: !showForm})}>Add tag rule</Button>
          </div>
          <ResourceList
            items={tags}
            renderItem={(item) => {
              const {tagName, tagDesc, tagId} = item;

              return (
                <ResourceList.Item
                  tagName={tagName}
                  tagDesc={tagDesc}
                >
                  <ul className="tag-list-item">
                    <li>
                      <TextStyle variation="strong">{tagName}</TextStyle>
                    </li>
                    <li><TextStyle>{tagDesc}</TextStyle></li>
                    <li>
                      <a href="javascript:;" onClick={() => this.deleteTagById(tagId)}>delete</a> 
                      <span className="divider">|</span> 
                      <a href="javascript:;" onClick={() => this.editTagById(tagId)} >edit</a>
                      <span className="divider">|</span> 
                      <a href="javascript:;">enabled</a> 
                    </li>
                  </ul>
                  
                  
                </ResourceList.Item>
              );
            }}
          />
        </Card.Section>
      </Card>
      
    );
  }

  deleteTagById = (tagId) => {
    const {deleteTag} = this.props;
    deleteTag(tagId);
  }

  renderPlanSettings = () => {
    return(
      <Card>
        <Card.Section
          title={
            <Stack>
              <Subheading>Current plan</Subheading>
            </Stack>
          }
        >
          <List type="bullet">
            <List.Item>You are using plan <strong>FREE.</strong> (No fees)</List.Item>
            <List.Item>It is for <strong>14 days trial</strong>.</List.Item>
          </List>
          <p className="marginTop"><Button primary>Upgrade plan</Button></p>
          
        </Card.Section>
      </Card>
    );
  }

  renderProfileInformation = () => {
    return (
      <div>
        <div className="floated-action">
          <div className="action">
          <Icon source="external" />
          </div>
          
        </div>
        <div className="profileInfo">
            <Avatar customer name="Roshan" 
        /> 
        <span className="username">Roshan Deo</span>
        </div>
      </div>
    );
  }

  renderEditSettings= () =>  {
    const {enableSetting1} = this.state;
    const contentStatus = enableSetting1 ? 'Disable' : 'Enable';
    const textStatus = enableSetting1 ? 'enabled' : 'disabled';

    return (
      <SettingToggle
        action={{
          content: contentStatus,
          onAction: this.handleSettingChange,
        }}
        enabled={enableSetting1}
      >
        This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
      </SettingToggle>
    );
  }

  renderSettings= () =>  {
    return(
      <div>
        <div className="floated-action">
          <div className="action">
          <Icon source="external" />
          </div>
          
        </div>
        <ExceptionList
          items={[
            {
              icon: 'notes',
              description: 'Telegram is enabled'
            },
            {
              icon: 'notes',
              description: 'Slack is enabled'
            },
            {
              icon: 'notes',
              description: 'Email is enabled'
            }
          ]}
        />
      </div>
      
    );
  }


  handleSettingChange = () => {
    this.setState(({enableSetting1}) => {
      return {enableSetting1: !enableSetting1};
    });
  };

  componentWillMount() {
    //this.props.fetchTags(); //fetch tags from firebase
  }
  render() {
    const {showForm} = this.state;
    return (
      <Page fullWidth>
        
        <Layout>
          <Layout.Section>
            {this.renderForm()}
            {this.renderTags()}
            {this.renderPlanSettings()}
          </Layout.Section>
          <Layout.Section secondary>
            <Card subdued>
              <Card.Section
                title={
                  <Stack>
                    <Icon source="profile" />
                    <Subheading>Profile</Subheading>
                  </Stack>
                }
              >
                {this.renderProfileInformation()}
              </Card.Section>
            </Card>

            <Card subdued>
              <Card.Section
                title={
                  <Stack>
                    <Icon source="refresh" />
                    <Subheading>Settings</Subheading>
                  </Stack>
                }
              >
                {this.renderSettings()}
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}


export default TagList;