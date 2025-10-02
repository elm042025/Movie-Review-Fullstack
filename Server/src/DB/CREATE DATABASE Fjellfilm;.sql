CREATE DATABASE Fjellfilm;
GO

USE Fjellfilm;
GO

/* ===== 1) Movies table ===== */
CREATE TABLE dbo.Movies (
    id           INT IDENTITY(1,1) PRIMARY KEY,
    title        NVARCHAR(100)  NOT NULL,
    director     NVARCHAR(100)  NULL,
    releaseYear  INT            NOT NULL,
    genre        NVARCHAR(50)   NULL,

    -- Prevent duplicates like same title+year twice
    CONSTRAINT UNIQUE_Movies_TitleYear
        UNIQUE (title, releaseYear)
);

/* ===== 2) Reviews table ===== */
CREATE TABLE dbo.Reviews (
    id            INT IDENTITY(1,1) PRIMARY KEY,
    movieId       INT            NOT NULL,
    reviewAuthor  NVARCHAR(100)  NOT NULL,
    reviewText    NVARCHAR(MAX)  NOT NULL,
    rating        TINYINT        NOT NULL,

    -- Enforce rating range at DB level
    CONSTRAINT CHECK_Reviews_Rating
        CHECK (rating BETWEEN 1 AND 5),

    -- Enforce relation to Movies; cascade delete keeps data clean
    CONSTRAINT FOREIGNKEY_Reviews_Movies
        FOREIGN KEY (movieId)
        REFERENCES dbo.Movies(id)
        ON DELETE CASCADE
);

/* ===== 3) Helpful index for lookups by movieId ===== */
CREATE INDEX INDEX_Reviews_MovieId ON dbo.Reviews(movieId);