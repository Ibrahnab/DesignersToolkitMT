import {check} from 'meteor/check';
import { ProjectsCollection } from './ProjectsCollection';
import { TeamsCollection } from './TeamsCollection';
import { useTracker } from 'meteor/react-meteor-data';

Meteor.methods({
    'projects.insert'(teamId, projectName, timeAllocated) {
        check(projectName, String);
        check(timeAllocated, [Number]);
        const user = useTracker(() => Meteor.user());
    
        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        const projectId = ProjectsCollection.insert({
            projectName: projectName,
            createdAt: new Date,
            userId: this.userId,
            owner: user.username,
            teamId: teamId,
            methodsUsed: [],
            timeAllocated: timeAllocated,
            timeUsed: [0,0,0,0,0,0]
        })
    },

    'projects.remove'(projectId) {
        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        ProjectsCollection.remove(projectId);
    },

    'projects.addMethod'(projectId,methodId, inPhase, methodNote){
        check(projectId, String);
        check(methodId, String);
        check(inPhase, String);
        check(methodNote, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        //Returns the project as an object: {_id: x, projectName: y etc..}
        const project = ProjectsCollection.findOne({_id: projectId});

        //Should return the object of the used method in an array: [{methodId: x, etc..}]
        const methods = project.methodsUsed.filter(e => e.methodId === methodId);

        if(methods.length > 0){

            //Finds the specific object in the methods array and pushes the method into the phase into it
            ProjectsCollection.update(
                {_id: projectId}, 
                { $push: {"methodsUsed.$[element].inPhases": inPhase}}, 
                {arrayFilters:[{"element.methodId": methodId}]}
            )
            return;
        }

        ProjectsCollection.update(projectId, {
            $push: {
                methodsUsed: {
                    methodId: methodId,
                    inPhases: [inPhase],
                    methodNote: ""
                }
            }
        })
    },

    'projects.removeMethod'(projectId, methodId, fromPhase){
        check(projectId, String);
        check(methodId, Number);
        check(fromPhase, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }
        
        ProjectsCollection.update(
            {_id: projectId}, 
            { $pull: {"methodsUsed.$[element].inPhases": fromPhase}}, 
            {arrayFilters:[{"element.methodId": methodId}]}
        )
    },

    'projects.addNoteToMethod'(projectId, methodId, note){
        check(projectId, String);
        check(methodId, String);
        check(note, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        //Returns the project as an object: {_id: x, projectName: y etc..}
        const project = ProjectsCollection.findOne({_id: projectId});

        //Should return the object of the used method in an array: [{methodId: x, etc..}]
        const methods = project.methodsUsed.filter(e => e.methodId === methodId);

        if(methods.length > 0){
            
            ProjectsCollection.update(
                {_id: projectId}, 
                { $set: {"methodsUsed.$[element].methodNote": note}}, 
                {arrayFilters:[{"element.methodId": methodId}]}
            )
            return;
        }

        ProjectsCollection.update(projectId, {
            $push: {
                methodsUsed: {
                    methodId: methodId,
                    inPhases: [],
                    methodNote: note
                }
            }
        })
    },

    'projects.editProject'(projectId, projectName, timeAllocated){
        check(projectId, String);
        check(timeAllocated, [Number]);
        check(projectName, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        ProjectsCollection.update(projectId, {
            $set: {
                projectName: projectName,
                timeAllocated, timeAllocated
            }
        })
    }

});