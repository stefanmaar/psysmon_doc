---
title: "Project creation"
layout: doc_chapter
subheadline: "Setting up the database and creating a project."
description: "Setting up the database and creating a project."
teaser: "The initial steps to work with psysmon ist the creation of a project. psysmon uses a database to store data. Therefore the database has to be setup properly so that psysmon can create the needed database tables."
image_dir: tut_sbe/project_creation

namespace: tut_sbe_project_creation

type: chapter

permalink: project_creation
---

To start working with psysmon, a project has to be created first. Creating a project triggers the following steps:
  - Creation of database tables related to the project;
  - Creation of a directory structure related to the project;
  - Creation of a project file;
  
## Create a project 

First create a directory on your filesystem where you want to store the psysmon directory structure and the psysmon project file. I'm creating the directory `psysmon_projects` in my `tutorial folder`.

~~~console
(psysmon) stefan@hausmeister:~/tutorial$ mkdir psysmon_projects
(psysmon) stefan@hausmeister:~/tutorial$ ls
psysmon  psysmon_projects  venv
(psysmon) stefan@hausmeister:~/tutorial$
~~~

Next start psysmon and select the menu `File -> New project`. A dialog will open where you have to enter several parameters relevant to the project. 
