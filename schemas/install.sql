CREATE TABLE users (
    userid varchar(255),
    warns INT,
    kicks INT,
    bans INT,
    mutes INT,
    isMuted varchar(255),
    muteTime INT
);

CREATE TABLE stickymsgs (
    channelid varchar(255),
    msg TEXT,
    enforcerid varchar(255)
);

CREATE TABLE offlinebans (
    id varchar(255),
    reason text
);

CREATE TABLE chatlvl (
    userid text,
    userxp INT,
    userlvl INT
);

CREATE TABLE cases (
    userid varchar(255),
    reason text,
    uniqueid varchar(255),
    enforcerid varchar(255),
    type varchar(255)
);
