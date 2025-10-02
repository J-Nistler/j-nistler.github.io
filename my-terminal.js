
const font = 'Slant';

figlet.defaults({ fontPath: 'https://cdn.jsdelivr.net/npm/figlet/fonts' });
figlet.preloadFonts([font], ready);

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const directories = {
    education: [
        '',
        '<white>education</white>',
        '* Certified Full Stack Web Developer <orange> PDX Code Guild (Bootcamp)</orange> 2021',
        '* Master of Library and Information Science (MLIS) <purple>University of Washington</purple> 2018-2020',
        '* Bachelor of International Studies <red>University of Utah</red> 2016-2018',
        '* Associate of Arts in Arabic <green>Defense Language Instutite Foriegn Language Center</green> 2010-2012',
        ''
    ],
    experience: [
        '',
        '<white>experience</white>',
        '* Senior Systems Librarian / Systems Program Manager <yellow>U.S. Department of State</yellow> 2021-Present',
        '* Electronic Resources Librarian / Content Management Systems Librarian <yellow>Northern Virginia Community College</yellow> 2019-2021',
        '* Reference and Instruction Librarian <yellow>Northern Virginia Community College</yellow> 2019',
        '* Archives Intern <yellow>Special Collections Research Center, George Mason University</yellow> 2019',
        '* Research Liaison <yellow>United States Department of Agriculture, Forest Service</yellow> 2019',
        '* Project Archivist <yellow>University of Utah, J. Willard Marriott Library</yellow> 2018',
        '* Preservation & Digital Access Technician <yellow>University of Utah, J. Willard Marriott Library</yellow> 2016-2017',
        '* Operation Manager/Analyst, Signals Intelligence <yellow>United States Army, Signals Intelligence/Arabic Crypto-Linguistics</yellow> 2010-2016',
        ''
    ],
    projects: [
        '',
        '<white>projects</white>',
        [
            ['2019 - A Quantitative Approach to the Magnetic Media Crisis',
             'https://github.com/J-Nistler/quant_magnetic_media',
             'Skills used: Git, HTML, Markdown, R Markdown, Quantitative/Qualitative Research Methods'
            ],
            ['2019 - Iraq in European Newspaper Editorials 1991-2013',
                'https://bit.ly/Iraq-StoryMap', 
                'Skills used: Gale Digital Scholarship Lab, Voyant, Text Mining, Primary Research, Data Analysis'
            ],
            ['2018 - Audio Visual Survey Tool (AVST)',
                'https://github.com/J-Nistler/AVST-Database-Application', 
                'Skills used: Microsoft Access, Visual Basic, SQL'
            ]
        ].map(([name, url, description = '']) => {
            return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
        }),
        ''
    ].flat(),
    skills: [
        '',
        '<white>Library Systems Management and Administration</white>',
        [
            '<yellow>Integrated Library Systems(ILS):</yellow> OCLC WorldShare Management System (WMS); Ex Libris Alma/Primo',
            '<yellow>Customer Relationship Management (CRM):</yellow> Salesforce – Library Support Application Administrator',
            '<yellow>Content Management System (CMS):</yellow> SpringShare Suite (LibGuides, LibWizard, LibCal, etc.); Confluence',
            '<yellow>Digital Asset Management Systems (DAM):</yellow> Omeka Classic; OCLC ContentDM',
            '<yellow>System Migrations:</yellow> Elimination of Technical Debt; ContentDM to Omeka; Wiki to OneNote; Local to Cloud'
        ],
        '',
        '<white>Library Web Administration and Knowledge Management</white>',
        [
            '<orange>Web Platforms:</orange> Microsoft SharePoint; SpringShare CMS; WordPress; Wikipedia/MediaWiki',
            '<orange>Front-End Development:</orange> HTML; CSS/SASS/SCSS; JavaScript; Bootstrap; jQuery; Tailwind CSS',
            '<orange>Back-End Development:</orange> Django Web Framework; Application Programming Interface (APIs), SQL',
            '<orange>Identity and Access Management:</orange> Okta; EZProxy; Authelia; Nginx; Secure Web Application Gateway (SWAG)'
        ],
        '',
        '<white>Leadership and Program/Project Management</white>',
        [
            '<blue>Project Management:</blue> Waterfall Project Management; Agile Project Management',
            '<blue>Workflow/Process Automation:</blue> Python; Windows PowerShell; OpenRefine; PowerQuery; PowerAutomate; SUSHI'
        ],
        '',
        '<white>Communication and Collaboration</white>',
        [
            '<green>Team Collaboration:</green> Oral and Written Technical Communication; Team Building; Zoom; Slack; Microsoft Teams',
            '<green>Technical Communication:</green> Technical Webinars; Process/Workflow Documentation; Change Management',
            '<green>Remote Work:</green> Collaboration via Work from Home; Building Virtual Staff Spaces/Intranets; Virtual Engagement'
        ],
        ''
    ].flat(),
    publications: [
        '',
        '<white>publications</white>',
        '* 2020 - Nistler, Jared and Ketchley, Sarah. “Developing Literacies in the Digital Humanities Classroom: A Case Study.”',
        'Literacies in a Digital Humanities Context, special issue of dh+lib, 2020, pp. 24-31.',
        '* 2018 - Nistler, Jared. “No One Needs to Know My War Stories.”',
        'Undergraduate Journal of Contemporary Issues and Media, vol. 3, 2021, pp. 38-42. (written in 2018, published in 2021).',
        ''
    ],
        awards: [
        '',
        '<white>awards</white>',
        '* 2025 – Superior Honor Award, U.S. Department of State',
        '* 2025 – 2024 Federal Librarian of the Year, Library of Congress via FEDLINK',
        '* 2024 – Superior Honor Award, U.S. Department of State',
        '* 2023 – Meritorious Honor Award, U.S. Department of State',
        ''
    ],
};

const dirs = Object.keys(directories);

const root = '~';
let cwd = root;

const user = 'guest';
const server = 'jnistler.dev';

// not every command needs to be binary
// we picked those three that works more like real programs
const files = [
    'joke',
    'credits'
];

function prompt() {
    return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

function print_home() {
     term.echo(dirs.map(dir => {
         return `<blue class="directory">${dir}</blue>`;
     }).join('\n'));
     term.echo(files.map(file => {
         return `<green class="command">${file}</green>`;
     }).join('\n'));
}

const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    ls(dir = null) {
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                 print_home();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(directories[dir].join('\n'));
                }
            } else if (cwd === root) {
                if (dir in directories) {
                    this.echo(directories[dir].join('\n'));
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_home();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === root) {
           print_home();
        } else {
            const dir = cwd.substring(2);
            this.echo(directories[dir].join('\n'));
        }
    },
    async joke() {
        // we use programming jokes so it fit better developer portfolio
        const res = await fetch('https://v2.jokeapi.dev/joke/Programming');
        const data = await res.json();
        if (data.type == 'twopart') {
            // this allow to create sequence of typing animations
            this.animation(async () => {
                // as said before in every function, passed directly
                // to terminal, you can use `this` object
                // to reference terminal instance
                await this.echo(`Q: ${data.setup}`, {
                    delay: 50,
                    typing: true
                });
                await this.echo(`A: ${data.delivery}`, {
                    delay: 50,
                    typing: true
                });
            });
        } else if (data.type === 'single') {
            this.echo(data.joke, {
                delay: 51,
                typing: true
            });
        }
    },
    cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
            cwd = dir;
        } else if (dir.startsWith('../') && cwd !== root && dirs.includes(dir.substring(3))) {
            cwd = root + '/' + dir.substring(3);
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    },
    credits() {
        // you can return string or a Promise from a command
        return [
            '',
            '<white>Used libraries:</white>',
            '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
            '* <a href="https://jokeapi.dev/">Joke API</a>',
            '',
            'This site was created by totally ripping off the work of <a href="https://github.com/jcubic">jcubic a.k.a. Jakub T. Jankiewicz</a>',
            'Thank you! Your work is so cool!',
            ''
        ].join('\n');
    },
    echo(...args) {
        if (args.length > 0) {
            term.echo(args.join(' '));
        }
    }
};

// clear is default command that you can turn off with an option
const command_list = ['clear'].concat(Object.keys(commands));
const formatted_list = command_list.map(cmd => `<white class="command">${cmd}</white>`);
const help = formatter.format(formatted_list);

const re = new RegExp(`^\s*(${command_list.join('|')})(\s?.*)`);

$.terminal.new_formatter([re, function(_, command, args) {
    return `<white class="command">${command}</white><aquamarine>${args}</aquamarine>`;
}]);

$.terminal.xml_formatter.tags.blue = (attrs) => {
    return `[[;#55F;;${attrs.class}]`;
};
$.terminal.xml_formatter.tags.green = (attrs) => {
    return `[[;#44D544;;${attrs.class}]`;
};

const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    // terminal should be disabled when running in CodePen preview
    enabled: $('body').attr('onload') === undefined,
    completion(string) {
        // in every function we can use this to reference term object
        const { name, rest } = $.terminal.parse_command(this.get_command());
        if (['cd', 'ls'].includes(name)) {
            if (rest.startsWith('~/')) {
                return dirs.map(dir => `~/${dir}`);
            }
            if (rest.startsWith('../') && cwd != root) {
                return dirs.map(dir => `../${dir}`);
            }
            if (cwd === root) {
                return dirs;
            }
        }
        return Object.keys(commands);
    },
    execHash: true,
    prompt
});

term.pause();

term.on('click', '.command', function() {
   const command = $(this).text();
   term.exec(command, { typing: true, delay: 50 });
});

term.on('click', '.directory', function() {
    const dir = $(this).text();
    term.exec(`cd ~/${dir}`, { typing: true, delay: 50 });
});

function ready() {
    const seed = rand(256);
    term.echo('<white>Systems Librarian | Full Stack Web Developer | Open Source Software Advocate</white>\n').resume()
        .echo(() => rainbow(render('Jared Nistler'), seed))
        .echo('')
        .echo('');
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}

function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}

function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}

github('jcubic/jquery.terminal');
