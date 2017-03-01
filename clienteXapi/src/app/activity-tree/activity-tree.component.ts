import { Component, OnInit, ViewChild } from '@angular/core';
import {RestService} from '../servicios/rest.service';

//tree de PrimeNg
//import {Message,MenuItem,TreeNode} from 'primeng/components/common/api';
//import {Tree} from 'primeng/components/tree/tree';
//import {TreeModule} from 'primeng/primeng';
import {Growl} from 'primeng/primeng';

import {Message,MenuItem,TreeNode} from 'primeng/primeng';
import {Tree} from 'primeng/primeng';

import {TreeTableModule,SharedModule} from 'primeng/primeng';





@Component({
  selector: 'app-activity-tree',
  templateUrl: './activity-tree.component.html',
  styleUrls: ['./activity-tree.component.css'],
  providers: [RestService]
})
export class ActivityTreeComponent implements OnInit {
  title = 'Arbol de actividades';
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
    this.items = [
        {label: 'View', icon: 'fa-search', command: (event) => this.viewFile(this.selectedFile2)},
        {label: 'Unselect', icon: 'fa-close', command: (event) => this.unselectFile()}
    ];
  }


getArbolActividades(){
      this.restService.getArbolDeActividades()
              .subscribe(
                //arbolJson => {this.arbolJson = arbolJson;
                arbolJson => {this.filesTree8 = [{
                                                    label: 'Root',
                                                    children: arbolJson
                                                }];
                                  console.log('El arbol tiene estos datos:  ', this.filesTree8);
                               },
                error =>  this.errorMessage = <any>error);
  }

/*
getArbolActividades(){
      this.restService.getArbolDeActividades()
              .subscribe(
                //arbolJson => {this.arbolJson = arbolJson;
                arbolJson => {this.filesTree8 = arbolJson;
                                  console.log('El arbol tiene estos datos:  ', this.filesTree8);
                               },
                error =>  this.errorMessage = <any>error);
  }
  */

    
    
    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
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

    private expandRecursive(node:TreeNode, isExpand:boolean){
        node.expanded = isExpand;
        if(node.children){
            node.children.forEach( childNode => {
                this.expandRecursive(childNode, isExpand);
            } );
        }
    }
}//Fin de la clase
