import {check} from 'meteor/check';
import { ProjectsCollection } from './ProjectsCollection';
import { useTracker } from 'meteor/react-meteor-data';

Meteor.methods({
    'projects.insert'(projectName, timeAllocated) {
        check(projectName, String);
        check(timeAllocated, [Number]);
        const user = useTracker(() => Meteor.user());
    
        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        ProjectsCollection.insert({
            projectName: projectName,
            createdAt: new Date,
            userId: this.userId,
            owner: user.username,
            methodsUsed: [],
            timeAllocated: timeAllocated,
            timeUsed: [0,0,0,0,0,0]
        })
    },

    'projects.remove'(projectId) {
        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        ProjectCollection.remove(projectId);
    },

    'projects.addMethod'(projectId,methodId, inPhase, methodNote){
        check(projectId, String);
        check(methodId, Number);
        check(inPhase, String);
        check(methodNote, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        ProjectsCollection.update(projectId, {
            $push: {
                methodsUsed: {
                    methodId: methodId,
                    inPhase: inPhase,
                    methodNote: methodNote
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

        ProjectsCollection.update(projectId, {
            $pull: {
                methodsUsed: {
                    inPhase: fromPhase
                }
            }
        })
    },

    'projects.addNoteToMethod'(projectId, methodId, note){
        check(projectId, String);
        check(methodId, Number);
        check(note, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        ProjectsCollection.update(projectId, {
            $set: {
                methodsUsed: {
                    methodId: methodId,
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