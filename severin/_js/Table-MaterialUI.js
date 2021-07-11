
import React, { Component }  from 'react'
import {
  CCard,
  CCardBody,
  CDataTable,
  CModal,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CButton,
  CForm,
  CFormGroup,
  CValidFeedback,
  CInvalidFeedback,
  CLabel,
  CInput,
  CSwitch,
  CRow,
  CCol
} from '@coreui/react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableContainer } from '@material-ui/core';

const axios = require('axios')
const Config = require('../../Config.js')

export default class AdminUserType extends Component {
  constructor(props) {
    super(props);
    this.getAllUserTypes = this.getAllUserTypes.bind(this);
    this.deleteUserType = this.deleteUserType.bind(this);
    this.createUserType = this.createUserType.bind(this);
    this.updateUserType = this.updateUserType.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);

    this.state = {
      userTypesData: [],
      modal_delete: false,
      modal_create: false,
      current_id: null,
      userType: '',
      labInput: false,
      labAnalysis: false,
      labAdmin: false,
      stockUser: false,
      stockAdmin: false,
      hsImport: false,
      hsExport: false,
      hsAdmin: false,
      geologyImport: false,
      geologyExport: false,
      geologyAdmin: false,
      remark: '',
      _create: false
    }
  }

  componentDidMount() {
    this.getAllUserTypes();
  }

  handleInputChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSwitchChange(e) {
    var name = e.target.name;
    var value = e.target.checked;

    if (value === true) {
      switch (name) {
        case 'labAdmin':
          this.setState({
            labInput: true,
            labAnalysis: true
          })
          break;
        case 'stockAdmin':
          this.setState({
            stockUser: true
          })
          break;
        case 'hsAdmin':
          this.setState({
            hsImport: true,
            hsExport: true
          })
          break;
        case 'geologyAdmin':
          this.setState({
            geologyImport: true,
            geologyExport: true
          })
          break;
        default:
          break;
      }
    }
    if (value === false) {
      switch (name) {
        case 'labInput': case 'labAnalysis':
          this.setState({
            labAdmin: false
          })
          break;
        case 'stockUser':
          this.setState({
            stockAdmin: false
          })
          break;
        case 'hsImport': case 'hsExport':
          this.setState({
            hsAdmin: false
          })
          break;
        case 'geologyImport': case 'geologyExport':
          this.setState({
            geologyAdmin: false
          })
          break;
        default:
          break;
      }
    }

    this.setState({
      [name]: value
    })
  }

  renderModalCreate() {
    return (
      <CCard>
        <CCardBody>
          <CForm className="was-validated" onSubmit={this.state._create === true ? this.createUserType : this.updateUserType}>
            <CFormGroup>
              <CLabel>UserType</CLabel>
              <CInput name="userType" value={this.state.userType} onChange={this.handleInputChange} required />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">Input provided</CValidFeedback>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="2">
                  <CLabel>Lab Input</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="labInput" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.labInput} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="2">
                  <CLabel>Lab Analysis</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="labAnalysis" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.labAnalysis} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="2">
                  <CLabel>Lab Admin</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="labAdmin" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.labAdmin} onChange={this.handleSwitchChange}/>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="2">
                  <CLabel>Stock User</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="stockUser" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.stockUser} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="2">
                  <CLabel>Stock Admin</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="stockAdmin" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.stockAdmin} onChange={this.handleSwitchChange}/>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="2">
                  <CLabel>Hs Import</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="hsImport" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.hsImport} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="2">
                  <CLabel>Hs Export</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="hsExport" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.hsExport} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="2">
                  <CLabel>Hs Admin</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="hsAdmin" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.hsAdmin} onChange={this.handleSwitchChange}/>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CRow>
                <CCol md="2">
                  <CLabel>Geology Import</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="geologyImport" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.geologyImport} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="2">
                  <CLabel>Geology Export</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="geologyExport" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.geologyExport} onChange={this.handleSwitchChange}/>
                </CCol>
                <CCol md="2">
                  <CLabel>Geology Admin</CLabel>
                </CCol>
                <CCol md="2">
                  <CSwitch name="geologyAdmin" shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={this.state.geologyAdmin} onChange={this.handleSwitchChange}/>
                </CCol>
              </CRow>
            </CFormGroup>
            <CFormGroup>
              <CLabel>Remark</CLabel>
              <CInput name="remark" value={this.state.remark} onChange={this.handleInputChange} />
            </CFormGroup>
            <div className="float-right">
              <CButton type="submit" color="info">{ this.state._create === true ? 'Create' : 'Update' }</CButton>
              <span style={{padding: '4px'}}/>
              <CButton color="secondary" onClick={() => this.setModal_Create(false)}>Cancel</CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    )
  }

  render() {
    return (
      <div>
        <div>
          <CButton
            color="info"
            className="float-right"
            //style={{margin: '0px 0px 0px 16px'}}
            style={{margin: '16px'}}
            onClick={()=>{ this.on_create_clicked() }}
          ><i className="fa fa-plus"/><span style={{padding: '4px'}}/>Create New</CButton>
        </div>
        <div>
          <TableContainer>
            <Table style={{width: '100%'}}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" rowSpan={2}>User Type</TableCell>
                  <TableCell align="center" colSpan={3}>Laboratory</TableCell>
                  <TableCell align="center" colSpan={2}>Stock Management</TableCell>
                  <TableCell align="center" colSpan={3}>HS</TableCell>
                  <TableCell align="center" colSpan={3}>Geology</TableCell>
                  <TableCell align="center" rowSpan={2}>Remark</TableCell>
                  <TableCell align="center" rowSpan={2}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Input</TableCell>
                  <TableCell>Anaylsis</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Import</TableCell>
                  <TableCell>Export</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Import</TableCell>
                  <TableCell>Export</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.userTypesData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.userType}</TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.labInput} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.labAnalysis} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.labAdmin} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.stockUser} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.stockAdmin} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.hsImport} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.hsExport} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.hsAdmin} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.geologyImport} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.geologyExport} disabled/>
                    </TableCell>
                    <TableCell>
                      <CSwitch className={'mx-1'} shape={'pill'} color={'info'} labelOn={'\u2713'} labelOff={'\u2715'} checked={item.geologyAdmin} disabled/>
                    </TableCell>
                    <TableCell>{item.remark}</TableCell>
                    <TableCell style={{width: '84px'}}>
                      <div style={{display: 'flex'}}>
                        <CButton
                          color="info"
                          size="sm"
                          onClick={()=>{ this.on_update_clicked(item) }}
                        ><i className="fa fa-edit"/></CButton>
                        <span style={{padding: '4px'}}/>
                        <CButton
                          color="danger"
                          size="sm"
                          onClick={()=>{ this.on_delete_clicked(item._id) }}
                        ><i className="fa fa-trash"/></CButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
              
        <CModal 
          show={this.state.modal_delete} 
          onClose={() => this.setModal_Delete(false)}
        >
          <CModalHeader>
            <CModalTitle>Confirm</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Do you really want to delete current user type?
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => this.deleteUserType()}
            >Delete</CButton>{' '}
            <CButton 
              color="secondary" 
              onClick={() => this.setModal_Delete(false)}
            >Cancel</CButton>
          </CModalFooter>
        </CModal>
        
        <CModal 
          show={this.state.modal_create} 
          onClose={() => this.setModal_Create(false)}
          closeOnBackdrop={false}
          centered
          size="lg"
        >
          <CModalHeader>
            <CModalTitle>{this.state._create === true ? 'Create New User Type' : 'Update User Type'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            { this.renderModalCreate() }
          </CModalBody>
        </CModal>
      </div>
    );
  }

  getAllUserTypes() {
    axios.get(Config.ServerUri + '/get_all_userTypes')
    .then((res) => {
      this.setState({
        userTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }

  on_delete_clicked(id) {
    this.setState({current_id: id});

    this.setModal_Delete(true);
  }

  on_create_clicked() {
    this.setState({
      userType: '',
      labInput: false,
      labAnalysis: false,
      labAdmin: false,
      stockUser: false,
      stockAdmin: false,
      hsImport: false,
      hsExport: false,
      hsAdmin: false,
      geologyImport: false,
      geologyExport: false,
      geologyAdmin: false,
      remark: '',
      _create: true
    });

    this.setModal_Create(true);
  }
  
  on_update_clicked(item) {
    this.setState({
      current_id: item._id,
      userType: item.userType,
      labInput: item.labInput,
      labAnalysis: item.labAnalysis,
      labAdmin: item.labAdmin,
      stockUser: item.stockUser,
      stockAdmin: item.stockAdmin,
      hsImport: item.hsImport,
      hsExport: item.hsExport,
      hsAdmin: item.hsAdmin,
      geologyImport: item.geologyImport,
      geologyExport: item.geologyExport,
      geologyAdmin: item.geologyAdmin,
      remark: item.remark,
      _create: false
    });

    this.setModal_Create(true);
  }

  deleteUserType() {
    this.setModal_Delete(false);

    axios.post(Config.ServerUri + '/delete_userType', {
      id: this.state.current_id
    })
    .then((res) => {
      this.setState({
        userTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }

  createUserType(event) {
    event.preventDefault();

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/create_userType', {
      userType: this.state.userType,
      labInput: this.state.labInput,
      labAnalysis: this.state.labAnalysis,
      labAdmin: this.state.labAdmin,
      stockUser: this.state.stockUser,
      stockAdmin: this.state.stockAdmin,
      hsImport: this.state.hsImport,
      hsExport: this.state.hsExport,
      hsAdmin: this.state.hsAdmin,
      geologyImport: this.state.geologyImport,
      geologyExport: this.state.geologyExport,
      geologyAdmin: this.state.geologyAdmin,
      remark: this.state.remark
    })
    .then((res) => {
      this.setState({
        userTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }
  
  updateUserType(event) {
    event.preventDefault();

    this.setModal_Create(false);

    axios.post(Config.ServerUri + '/update_userType', {
      id: this.state.current_id,
      userType: this.state.userType,
      labInput: this.state.labInput,
      labAnalysis: this.state.labAnalysis,
      labAdmin: this.state.labAdmin,
      stockUser: this.state.stockUser,
      stockAdmin: this.state.stockAdmin,
      hsImport: this.state.hsImport,
      hsExport: this.state.hsExport,
      hsAdmin: this.state.hsAdmin,
      geologyImport: this.state.geologyImport,
      geologyExport: this.state.geologyExport,
      geologyAdmin: this.state.geologyAdmin,
      remark: this.state.remark
    })
    .then((res) => {
      this.setState({
        userTypesData: res.data
      });
    })
    .catch((error) => {
      
    })
  }

  setModal_Delete(modal) {
    this.setState({
      modal_delete: modal
    })
  }

  setModal_Create(modal) {
    this.setState({
      modal_create: modal
    })
  }
}