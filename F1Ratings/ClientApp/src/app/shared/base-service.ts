import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class BaseService{

    constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string ){}

    /**
     * Add entity to controller
     * @param {object} entity - Object that contains entity props(without id).
     * @param {string} contoller - Controller url (/New is added)
     */
    protected addEntity( entity: object, controller: string ){
        return this.http.post(`${this.baseUrl+controller}/New`, entity);
    }

    /**
     * Add entity to controller
     * @param {string} contoller - Controller url (/All is added)
     */
    protected allEntities(controller: string){
        return this.http.get(`${this.baseUrl+controller}/All`);
    }

    /**
     * Add entity to controller
     * @param {number} entityId - Entity Id thats going to be removed
     * @param {string} contoller - Controller url (/New is added)
     */
    protected removeEntity(entityId: number, controller: string){
        return this.http.delete(`${this.baseUrl+controller}/Delete/${entityId}`);
    }

    /**
     * Add entity to controller
     * @param {object} entity - Object that contains entity props(with Id).
     * @param {string} contoller - Controller url (/New is added)
     */
    protected editEntity(entity: object, controller: string){
        return this.http.put(`${this.baseUrl+controller}/Edit`, entity);
    }
}