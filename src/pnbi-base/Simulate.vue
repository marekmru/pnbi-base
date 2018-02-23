<template>
    <v-layout column>
        <div align-center id="login"  class="centrate">
            <v-layout column >
                <v-flex>
                    <v-layout justify-center>                        
                            <h1 class="white--text">Kunde: Shoemaker</h1>
                    </v-layout>
                </v-flex>
                <v-flex>
                    <v-layout row justify-center pa-3>
                        <div class="pr-2"><h2 class="white--text"><v-icon color="white">star</v-icon> Qartal: 1 </h2></div>                  
                        <div><h2 class="white--text"><v-icon color="white">assignment_ind</v-icon> Qartal: 1</h2></div>                            
                    </v-layout>
                </v-flex>
            </v-layout>        
        </div>
        <v-flex xs10 offset-xs1>
            <v-card >
                <v-card-title class="title">
                    <h3>SIMULATION LÄUFT</h3>
                </v-card-title> 
                <v-card-text >
                    <v-layout column>
                        <v-flex mb-1>
                            <v-layout xs12 class="column_list">
                                <v-flex xs2 class="row_header centrate">
                                    <v-icon color="primary" class="header-icon" pr-2>hourglass_full</v-icon>Laufzeit   
                                </v-flex>
                                <v-flex class="row_progress">
                                    <v-chip color="primary" text-color="white">Os</v-chip>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex mb-1>
                            <v-layout class="column_list">
                                <v-flex align-center xs2 class="row_header centrate">
                                    <v-icon color="primary" class="header-icon" pr-2>note</v-icon>Phase 
                                </v-flex>
                                <v-flex align-center class="row_children centrate">Preparing</v-flex>
                                <v-flex align-center class="row_children centrate">Starting</v-flex>
                                <v-flex align-center class="row_children centrate">Running</v-flex>
                                <v-flex align-center class="row_children centrate">Stopping</v-flex>
                                <v-flex align-center class="row_children centrate">Finishing</v-flex>
                                <v-flex align-center class="row_children centrate last_children">Complete</v-flex>
                            </v-layout>
                        </v-flex>
                        <v-layout class="column_list">
                            <v-flex xs2 class="row_header centrate">
                                <v-icon color="primary" class="header-icon" pr-2>laptop</v-icon>Worker
                            </v-flex>
                            <v-flex class="row_progress">
                                <v-chip color="primary" text-color="white">O%</v-chip>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer><v-btn>SIMULATION STOPPEN</v-btn>                                    
                </v-card-actions>        
            </v-card>    
        </v-flex>    
    </v-layout>      
</template>

<script>
export default {

}
</script>

<style>
    .centrate{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #login{
        height: 175px;
    }
    .header-icon{
        padding-left: 3px;
        margin-right: 10px; 
    }
    .column_list{
        height: 45px;
    }
    .row_header {
        background: #eee;
        margin-right: 1.5px;
    }
    .row_children{
        margin-left: 1.5px;
        margin-right: 1.5px;
        background:#969696;
        text-align:center;
    }
    .last_children{
        margin-left: 1.5px;
        margin-right: 1px;
    }
    .row_progress{
        color:#d70f14;
        margin-left: 1px;
        margin-right: 1px;
        background:#969696;
    }
</style>


