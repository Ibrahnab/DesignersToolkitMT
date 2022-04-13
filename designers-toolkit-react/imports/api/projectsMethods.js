import {check} from 'meteor/check';
import { ProjectsCollection } from './ProjectsCollection';
import { TeamsCollection } from './TeamsCollection';
import { useTracker } from 'meteor/react-meteor-data';

const getPhaseIndex = (phase) => {

    switch(phase){
        case "understand":
            return 0;
            break;

        case "define":
            return 1;
            break;

        case "sketch":
            return 2;
            break;
        
        case "decide":
            return 3;
            break;

        case "prototype":
            return 4;
            break;

        case "validate":
            return 5;
            break;

        default:
            "";
    }
}

const timeTemplate = [
    {
        phase: "understand",
        time: 0
    },
    {
        phase: "define",
        time: 0
    },
    {
        phase: "sketch",
        time: 0
    },
    {
        phase: "decide",
        time: 0
    },
    {
        phase: "prototype",
        time: 0
    },
    {
        phase: "validate",
        time: 0
    }
]


Meteor.methods({
    'projects.insert'(teamId, projectName, timeAllocated) {
        check(projectName, String);
        check(timeAllocated, [Number]);
        const user = useTracker(() => Meteor.user());
    
        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }
        
        //Use this later if needed
        // const ta = [
        //     {
        //         phase: "understand",
        //         timeUsed: 0,
        //         timeAllocated: timeAllocated[0]
        //     },
        //     {
        //         phase: "define",
        //         timeUsed: 0,
        //         timeAllocated: timeAllocated[1]
        //     },
        //     {
        //         phase: "sketch",
        //         timeUsed: 0,
        //         timeAllocated: timeAllocated[2]
        //     },
        //     {
        //         phase: "decide",
        //         timeUsed: 0,
        //         timeAllocated: timeAllocated[3]
        //     },
        //     {
        //         phase: "prototype",
        //         timeUsed: 0,
        //         timeAllocated: timeAllocated[4]
        //     },
        //     {
        //         phase: "validate",
        //         timeUsed: 0,
        //         timeAllocated: timeAllocated[5]
        //     }
        // ]

        const projectId = ProjectsCollection.insert({
            projectName: projectName,
            createdAt: new Date,
            userId: this.userId,
            owner: user.username,
            teamId: teamId,
            methodsUsed: [],
            timeAllocated: timeAllocated,
            timeUsed: timeTemplate
        })

        // const projectId = ProjectsCollection.insert({
        //     projectName: projectName,
        //     createdAt: new Date,
        //     userId: this.userId,
        //     owner: user.username,
        //     teamId: teamId,
        //     methodsUsed: [],
        //     timeAllocated: timeAllocated,
        //     timeUsed: [0,0,0,0,0,0]
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

        //Returns the project as an object: {_id: x, projectName: y etc..}
        const project = ProjectsCollection.findOne({_id: projectId});

        //Should return the object of the used method in an array: [{methodId: x, etc..}]
        const methods = project.methodsUsed.filter(e => e.methodId === methodId);

        if(methods.length > 0){

            //Finds the specific object in the methods array and pushes the method into the phase into it
            ProjectsCollection.update(
                {_id: projectId}, 
                { $addToSet: {"methodsUsed.$[element].inPhases": inPhase}}, 
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

    'projects.addTime'(projectId, time, phase){
        check(projectId, String);
        check(time, Number);
        check(phase, String);
        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        //There is a bug here, if the method is added twice to the same phase, this func will still increment
        //Add checking to see if it already exists in the passed phase
        
        console.log(getPhaseIndex(phase))
        
        const str = "timeUsed." + getPhaseIndex(phase).toString();
        ProjectsCollection.update({_id: projectId}, 
            {$inc: {"timeUsed.$[element].time": time}}, 
            {arrayFilters: [{"element.phase": phase}]}
        )
    },

    'projects.subTime'(projectId, time, phase){
        check(projectId, String);
        check(time, Number);
        check(phase, String);
        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        //There is a bug here, if the method is added twice to the same phase, this func will still increment
        //Add checking to see if it already exists in the passed phase
        
        console.log("decremented" + getPhaseIndex(phase))
        
        const str = "timeUsed." + getPhaseIndex(phase).toString();
        ProjectsCollection.update({_id: projectId}, 
            {$inc: {"timeUsed.$[element].time": -time}}, 
            {arrayFilters: [{"element.phase": phase}]}
        )
    }
    ,

    'projects.removeMethod'(projectId, methodId, fromPhase){
        check(projectId, String);
        check(methodId, String);
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