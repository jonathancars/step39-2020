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
import { Button, ButtonGroup, Card, Checkbox, CircularProgress, Dialog, DialogActions,DialogContent, DialogContentText, 
  DialogTitle, FormGroup, FormControlLabel, Grid, List,
  Radio, RadioGroup, TextField } 
  from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import groceries from './header_no_text_blue_alt.png';
import placeholder from './placehold.png';
import { Store } from './Store';

import './styles.css';

/*
 * Displays a checkbox list containing the items returned from the Items API. 
 * The selected items are displayed below when the form is submitted. 
 */
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    
  }

  componentWillMount = () => {
   
  }

  render() {
      // Reactive font sizes?
    return (
      <div id="welcome-page-container">
        <div id="header">
          <img id="header-image" src={groceries} alt="Groceries"/>
          <div id="header-text">
            <h2>Shopsmart</h2>
          </div>
          <div id="slogan-text">
            <h3>Get prices you deserve.</h3>
          </div>
        </div>
        <Grid container justify="center" spacing={3} id="features-grid-container">
          <Grid item component={Card} xs>
            <div class="feature-card">
              <img src={placeholder} alt="stores"/>
              <h4>Add and save items to your list</h4>
              We aim to use modern API technology and computing to streamline the process of buying a set of items for the lowest possible cost. 
            </div>
          </Grid>
          <Grid item component={Card} xs>
            <div class="feature-card">
              <img src={placeholder} alt="stores"/>
              <h4>Find stores near you</h4>
              We aim to use modern API technology and computing to streamline the process of buying a set of items for the lowest possible cost. 
            </div>
          </Grid>
          <Grid item component={Card} xs>
            <div class="feature-card">
              <img src={placeholder} alt="stores"/>
              <h4>Get customized store recommendations</h4>
              We aim to use modern API technology and computing to streamline the process of buying a set of items for the lowest possible cost. 
            </div>
          </Grid>
        </Grid> 
        <Grid container id="about-grid">
          <Grid item component={Card} xs>
            <div id="about-text">
              <h4>[About/Background]</h4>
              We aim to use modern API technology and computing to streamline the process of buying a set of items for the lowest possible cost. 
            </div>
          </Grid>
          <Grid item component={Card} xs>
            <div class="feature-card">
              <img src={placeholder} alt="stores"/> 
            </div>
          </Grid>
        </Grid>
        <div id="creators-header">
          <h4>CREATORS</h4>
        </div>
        <Grid container justify="center" spacing={3} id="features-grid-container">
          <Grid item component={Card} xs>
            <div class="feature-card">
              <img src={placeholder} alt="stores"/>
              <h4>Anudeep Yakkala</h4>
              We aim to use modern API technology and computing to streamline the process of buying a set of items for the lowest possible cost. 
            </div>
          </Grid>
          <Grid item component={Card} xs>
            <div class="feature-card">
              <img src={placeholder} alt="stores"/>
              <h4>Brett Allen</h4>
              We aim to use modern API technology and computing to streamline the process of buying a set of items for the lowest possible cost. 
            </div>
          </Grid>
          <Grid item component={Card} xs>
            <div class="feature-card">
              <img src={placeholder} alt="stores"/>
              <h4>Carolyn Wang</h4>
              We aim to use modern API technology and computing to streamline the process of buying a set of items for the lowest possible cost. 
            </div>
          </Grid>
        </Grid>  
      </div>
    );
  }
}

export const WelcomePageWithStore = Store.withStore(WelcomePage);