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

        // TeamsCollection.update(teamId, {
        //     $push: {
        //         projects: projectId
        //     }
        // })
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
        check(methodId, String);
        check(note, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        ProjectsCollection.update(projectId, {
            $push: {
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