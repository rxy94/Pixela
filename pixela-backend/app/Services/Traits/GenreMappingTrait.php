<?php

namespace App\Services\Traits;

trait GenreMappingTrait
{
    /**
     * Mapping of genre names to their corresponding IDs for movies and TV shows
     * 
     * @var array<string, array<string, int>>
     */
    private const GENRE_MAPPING = [
        'action' => ['movie' => 28, 'tv' => 10759],
        'adventure' => ['movie' => 12, 'tv' => 10759],
        'animation' => ['movie' => 16, 'tv' => 16],
        'comedy' => ['movie' => 35, 'tv' => 35],
        'crime' => ['movie' => 80, 'tv' => 80],
        'documentary' => ['movie' => 99, 'tv' => 99],
        'drama' => ['movie' => 18, 'tv' => 18],
        'family' => ['movie' => 10751, 'tv' => 10751],
        'fantasy' => ['movie' => 14, 'tv' => 10765],
        'history' => ['movie' => 36, 'tv' => 36],
        'horror' => ['movie' => 27, 'tv' => 27],
        'music' => ['movie' => 10402, 'tv' => 10402],
        'mystery' => ['movie' => 9648, 'tv' => 9648],
        'romance' => ['movie' => 10749, 'tv' => 10749],
        'science_fiction' => ['movie' => 878, 'tv' => 10765],
        'tv_movie' => ['movie' => 10770, 'tv' => 10770],
        'thriller' => ['movie' => 53, 'tv' => 53],
        'war' => ['movie' => 10752, 'tv' => 10752],
        'western' => ['movie' => 37, 'tv' => 37]
    ];

    /**
     * Content types supported
     */
    private const CONTENT_TYPES = ['movie', 'tv'];

    /**
     * Get the genre ID for the specified content type
     *
     * @param string $genreName Name of the genre (e.g: 'action', 'drama')
     * @param string $type Content type ('movie' or 'tv')
     * @return int|null Genre ID or null if not found
     * @throws \InvalidArgumentException If the content type is not valid
     */
    public function getGenreId(string $genreName, string $type): ?int
    {
        if (!in_array($type, self::CONTENT_TYPES)) {
            throw new \InvalidArgumentException("Invalid content type. Must be 'movie' or 'tv'");
        }

        $genreName = strtolower($genreName);
        return self::GENRE_MAPPING[$genreName][$type] ?? null;
    }

    /**
     * Convert a genre ID from one type to another
     *
     * @param int $genreId Genre ID to convert
     * @param string $fromType Source type ('movie' or 'tv')
     * @param string $toType Destination type ('movie' or 'tv')
     * @return int|null Converted genre ID or null if not found
     * @throws \InvalidArgumentException If the types are not valid
     */
    public function convertGenreId(int $genreId, string $fromType, string $toType): ?int
    {
        if (!in_array($fromType, self::CONTENT_TYPES) || !in_array($toType, self::CONTENT_TYPES)) {
            throw new \InvalidArgumentException("Invalid content types. Must be 'movie' or 'tv'");
        }

        foreach (self::GENRE_MAPPING as $mapping) {
            if ($mapping[$fromType] === $genreId) {
                return $mapping[$toType];
            }
        }

        return null;
    }
} 