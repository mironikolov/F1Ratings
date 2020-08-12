using Microsoft.EntityFrameworkCore.Migrations;

namespace F1Ratings.Migrations
{
    public partial class AddPositionColToRaceResults : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Position",
                table: "RaceResults",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                table: "RaceResults");
        }
    }
}
