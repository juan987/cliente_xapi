import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {RestService} from '../servicios/rest.service';

//tree de PrimeNg
//import {Message,MenuItem,TreeNode} from 'primeng/components/common/api';
//import {Tree} from 'primeng/components/tree/tree';
//import {TreeModule} from 'primeng/primeng';
import {Growl} from 'primeng/primeng';

import {Message,MenuItem,TreeNode} from 'primeng/primeng';
import {Tree} from 'primeng/primeng';

//import {TreeTableModule,SharedModule} from 'primeng/primeng';
import {TreeTable} from 'primeng/primeng';

import {TreeModule} from 'primeng/primeng';





@Component({
  selector: 'app-activity-tree',
  templateUrl: './activity-tree.component.html',
  styleUrls: ['./activity-tree.component.css'],
  providers: [RestService]
})
export class ActivityTreeComponent implements OnInit {

  //Este valor lo paso a reporte-axi al hacer click en una actividad en el arbol
  @Output() datoDeTreeComponent = new EventEmitter<string>();


  selecionarActivity: boolean= false;
  title = 'Seleccione un "activity" (también llamadas targets u objects)';
  //arbolJson: {hola: 'kkk'};
  errorMessage: string;

  //PrimeNg tree
    msgs: Message[];

    @ViewChild('expandingTree')
    expandingTree: Tree;

    filesTree1: TreeNode[];
    filesTree2: TreeNode[];
    filesTree3: TreeNode[];
    filesTree4: TreeNode[];
    filesTree5: TreeNode[];
    filesTree6: TreeNode[];
    filesTree7: TreeNode[];
    filesTree8: TreeNode[];//tree horizontal
    
    lazyFiles: TreeNode[];
    
    selectedFile: TreeNode;
    
    selectedFile2: TreeNode;
    
    selectedFile3: TreeNode;
    
    selectedFiles: TreeNode[];
    
    selectedFiles2: TreeNode[];
    
    items: MenuItem[];
  //fin primeNg tree

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getArbolActividades();
    this.getArbolActividades2();

    /*
    this.filesTree2 = this.datos.data;
    this.filesTree8 = [{
                        label: 'Root',
                        children: this.datos.data
                    }];
    */

    this.items = [
        {label: 'View', icon: 'fa-search', command: (event) => this.viewFile(this.selectedFile2)},
        {label: 'Unselect', icon: 'fa-close', command: (event) => this.unselectFile()}
    ];
  }


getArbolActividades2(){
      this.restService.getArbolDeActividades()
              .subscribe(
                arbolJson => {this.filesTree2 = arbolJson;

                                  console.log('El arbol filesTree1 tiene estos datos:  ', this.filesTree1);
                               },
                error =>  this.errorMessage = <any>error);
  }


getArbolActividades(){
      this.restService.getArbolDeActividades()
              .subscribe(
                //arbolJson => {this.arbolJson = arbolJson;
                arbolJson => {this.filesTree8 = [{
                                    label: 'Actividades',
                                    children: arbolJson
                                }];
                                  console.log('El arbol filesTree8 tiene estos datos:  ', this.filesTree8);
                               },
                error =>  this.errorMessage = <any>error);
  }
  
  

    
    
    nodeSelect(event) {//No muestro el mensaje con p-growl
        //this.msgs = [];
        //this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
        //Aqui pongo el emisor de eventos, PARA RELLENAR EL DATO ACTIVIDAD DEL FORMULARIO
        this.datoDeTreeComponent.emit(event.node.label);
        //Cierra
        this.selecionarActivity = !this.selecionarActivity;
    }
    
    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }

    nodeExpandMessage(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Expanded', detail: event.node.label});
    }
    
    nodeExpand(event) {
        if(event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
           //this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);
        }
    }
    
    viewFile(file: TreeNode) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected with Right Click', detail: file.label});
    }

    unselectFile() {
        this.selectedFile2 = null;
    }

    expandAll(){
        this.filesTree6.forEach( node => {
            this.expandRecursive(node, true);
        } );
    }

    collapseAll(){
        this.filesTree6.forEach( node => {
            this.expandRecursive(node, false);
        } );
    }

    private expandRecursive(node:TreeNode, isExpand:boolean){
        node.expanded = isExpand;
        if(node.children){
            node.children.forEach( childNode => {
                this.expandRecursive(childNode, isExpand);
            } );
        }
    }

//***************************************************
//Json de prueba
datos = {
    "data": 
    [
        {
            "label": "Documents",
            "data": "Documents Folder",
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": [{
                    "label": "Work",
                    "data": "Work Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document"}]
                },
                {
                    "label": "Home",
                    "data": "Home Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month"}]
                }]
        },
        {
            "label": "Pictures",
            "data": "Pictures Folder",
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": [
                {"label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo"},
                {"label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo"},
                {"label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo"}]
        },
        {
            "label": "Movies",
            "data": "Movies Folder",
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": [{
                    "label": "Al Pacino",
                    "data": "Pacino Movies",
                    "children": [{"label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie"}]
                },
                {
                    "label": "Robert De Niro",
                    "data": "De Niro Movies",
                    "children": [{"label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie"}]
                }]
        }
    ]
}

}//Fin de la clase
