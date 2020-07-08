/*
 * Copyright 2020 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Checkbox, FormGroup, FormControlLabel, List, ListItem, ListItemText, Button, Grid, Card, 
  Radio, RadioGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } 
  from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Store } from './Store';


const items = [
  'Milk',
  'Bread',
  'Butter',
  'Orange Juice',
  'Burger Buns',
  'Taco Shells',
  'Pinto Beans',
];

/*
 * This class displays a checkbox list containing the items returned from the Items API. 
 * The selected items are displayed below when the form is submitted. 
 */
class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemsList: null,
      errorMessage: null,
      successMessage: null,
      distanceValue: 4,
      listId: -1,
      listName: null,
      userId: -1,
      listSaveDialog: {
        display: false,
      },
    }
  }

  componentWillMount = () => {
    this.selectedItems = new Set();
  }

  /* 
   * This funciton adds an item to the selectedItems list if an item is checked and removes
   * an item if it is unchecked. 
   */
  handleItemChange = (event) => {
    if (event.target.checked) {
      this.selectedItems.add(event.target.name);
    } else {
      this.selectedItems.delete(event.target.name);
    }
  }

  /* 
   * This function saves the most recently selected distance preferece. 
   */
  handleDistanceChange = (event) => {
    this.setState({
      distanceValue: parseInt(event.target.value),
    })
  }

  /* 
   * This funtion displays a list of the items selected from the checkbox list. 
   * @TODO Change this function to make a GET request to obtain store recommendations based 
   * on the selected items.
   */
  onSubmit = () => {
    const arr = [...this.selectedItems];
    if (arr.length === 0) {
      this.setState({
        selectedItemsList: null,
        errorMessage: "Please select at least one item!",
      });
      return;
    }
    const listItems = arr.map((item) => (
      <ListItem key={item}>
        <ListItemText
          primary={item}
          data-testid='list item'
          />
      </ListItem>
    ));
    this.setState({
      selectedItemsList: listItems,
      errorMessage: null,
    });
  }


  /* 
   * This function displays a dialog prompting the user to specify a name for the 
   * list that is going to be saved. 
   */
  onSave = () => {
    const arr = [...this.selectedItems];
    if (arr.length === 0) {
      this.setState({
        errorMessage: "Please select at least one item!",
      });
    } else {
      this.setState({
        listSaveDialog: {
          display: true,
          saveButtonDisabled: true,
          error: true,
          errorText: "This is a required field."
        },
        errorMessage: null,
      });
    }
  }

  handleDialogCancel = () => {
    this.setState({
      listSaveDialog: {
        display: false,
      },
    })
  }

  /* 
   * This function obtains the selected itmes from the checkbox list and makes a POST
   * request to /api/v1/create-or-update-user-list-servlet to save the specified list.
   */
  handleDialogSubmit = () => {
    this.setState({
      listSaveDialog: {
        display: false,
      },
    });
    const arr = [...this.selectedItems];
    axios.post(
      '/api/v1/create-or-update-user-list-servlet',
      { 
        userId: this.state.userId,
        userList: {
          listId: this.state.listId,
          displayName: this.state.listName,
          itemsTypes: arr
        }
      },
    ).then((res) => {
      this.setState({
        successMessage: "Your list has been saved!",
        listId: res.data.userList.listId,
      });
    }).catch((error) => {
      this.setState({
        errorMessage: "There was an error saving your list.",
      })
    });   
  }

  /*
   * This function checks to see if the "List Name" field is empty. If the field is empty, an 
   * error message is displayed and the save button is disabled. 
   */
  onTextFieldChange = (event) => {
    if (event.target.value.trim() === '') {
      this.setState({
        listSaveDialog: {
          display: true,
          error: true,
          errorText: "This is a required field.",
          saveButton: true,
        },
      });
    } else {
      this.setState({
        listName: event.target.value,
        listSaveDialog: {
          display: true,
          saveButtonDisabled: false,
        },
      });
    }
  }

  render() {
    const checkboxItems = items.map((item) => (
      <FormControlLabel
        control={<Checkbox name={item} data-testid='checkbox item'/>}
        label={item}
        key={item}
        onChange={this.handleItemChange}
        />
    ));

    const distances = [2, 4, 6, 8, 10, 12, 14].map((item) => (
      <FormControlLabel
        control={<Radio name={item + " mile radius"}/>}
        label={item + " mile radius"}
        value={item}
        key={item}
        onChange={this.handleDistanceChange}
        />
    ));

    return (
      <div id="list-page-container">
        {this.state.errorMessage ? <Alert severity="error">{this.state.errorMessage}</Alert> : null}
        {this.state.successMessage ? <Alert severity="error">{this.state.errorMessage}</Alert> : null}
        <h1>Preferences</h1>
        <Grid container alignItems="stretch">
          <Grid id="distance-list-container" item component={Card} xs>
            <p>I would like to choose from stores in a</p>
            <RadioGroup id="distance-list" value={this.state.distanceValue}>
              {distances} 
            </RadioGroup>
          </Grid>
          <Grid id="items-list-container" item component={Card} xs>
            <p>Select items to add to your list</p>
            <FormGroup id="items-list">
              {checkboxItems}
            </FormGroup>
            <Button  onClick={this.onSave}  variant="contained">Save List</Button>
            <List>
              {this.state.selectedItemsList}
            </List>
          </Grid>
        </Grid>
        <Button  onClick={this.onSubmit} color="primary" variant="contained">Find Stores</Button>
        <Dialog open={this.state.listSaveDialog.display} onClose={this.handleDialogCancel} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Save List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To save a list containing the selected items to your account, please enter a list name. 
            </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="list-name"
                label="List Name"
                helperText={this.state.listSaveDialog.errorText}
                error={this.state.listSaveDialog.error}
                onChange={this.onTextFieldChange}
                fullWidth
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogCancel} color="primary">
              Cancel
            </Button>
            <Button disabled={this.state.listSaveDialog.saveButtonDisabled} onClick={this.handleDialogSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export const ListPageWithStore = Store.withStore(ListPage);